require('dotenv').config();

const path = require('path');

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const session = require('express-session');
const flash = require('connect-flash');

const hbs = require('hbs');

const createError = require('http-errors');
const passport = require('passport');
const authUtils = require('./hashPassword');
const socketio = require('socket.io');

// const { ObjectId, MongoClient } = require('mongodb');
const { Strategy } = require('passport-local');
const mongoose = require('mongoose');

const initializeChatRoom = require('./chatroom/chatroom');
const { getUserBasicInfo } = require('./database/user');

const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 5000;
const sessionMiddleware = session({
  secret: 'session secret',
  resave: false,
  saveUninitialized: false,
});

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// const authRouter = require('./routes/auth');

/* Connect to Database */
mongoose.connect("mongodb://localhost:27017/FindTutorDB", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open', () => {
  console.log("connected to mongodb");
  // addUser({
  //   realname: "student",
  //   username: "student",
  //   password: "student",
  //   phonenumber: 1,
  //   email: "student",
  //   role: "student"
  // })
  // addUser({
  //   realname: "tutor",
  //   username: "tutor",
  //   password: "tutor",
  //   phonenumber: 2,
  //   email: "tutor",
  //   role: "tutor"
  // })
})
// MongoClient.connect('mongodb://localhost', { useUnifiedTopology: true }, (err, client) => {
//   if (err) {
//     throw err;
//   }
//   //connected to user database
//   // const db = client.db('account-app');
//   const db = client.db('FindTutorDB')
//   const users = db.collection('users');
//   app.locals.users = users;
// });

/* Configure passport */
passport.use(new Strategy(
  async (username, password, done) => {
    let user = await getUserBasicInfo({ username })

    if (!user) {
      return done(null, false);
    }

    if (user.password != authUtils.hashPassword(password)) {
      return done(null, false);
    }

    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  done(null, await getUserBasicInfo({ _id: _id }))
});


/* set views and hbs */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

/* app use middleware */
app.use(logger('dev'));
app.use(express.json());
app.use(multer().none())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionMiddleware);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/* Initialize socketIo */
const io = socketio(server);
initializeChatRoom(io, sessionMiddleware, passport);

/* Routes for action before log in */
app.post('/login', function (req, res, next) {
  let returnObject = {
    err: null,
    user: null
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      returnObject.err = err;
      return res.status(500).send(returnObject);
    }
    if (!user) { return res.status(401).send(returnObject); }
    req.logIn(user, function (err) {
      if (err) {
        returnObject.err = err;
        return res.status(500).send(returnObject);
      }

      returnObject.user = user;
      res.status(200).send(returnObject);
    });
  })(req, res, next);
})
app.use('/registration', require('./registration/cloneRegistration'));

/* Cjeck have logged in */
app.use((req, res, next) => {
  console.log('request body');
  console.log(req.body);
  console.log(req.isAuthenticated())
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      msg: "haven't login"
    })
  }

  res.locals.loggedIn = req.isAuthenticated();
  next();
});

/* Add new routes */
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/auth', authRouter);
app.use((req, res, next) => {
  console.log('passed log in');
  next();
})
app.use('/case', require('./case/case'));
app.use('/users', require('./user profile/users'));


/* Handle error */
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error'); // render the error page
});

server.listen(port, () => {
  console.log("server running on port: " + port);
});

module.exports = app;