var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const hbs = require('hbs');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const authUtils = require('./hashPassword');
const socketio = require('socket.io');
const initializeChatRoom = require('./chatroom/chatroom').initializeChatRoom;
const { getUserBasicInfo } = require('./database/user');

var app = express();
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

app.all('*', (req, res, next) => {
  console.log('getted request');
  next();
})
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
MongoClient.connect('mongodb://localhost', { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    throw err;
  }
  //connected to user database
  // const db = client.db('account-app');
  const db = client.db('FindTutorDB')
  const users = db.collection('users');
  app.locals.users = users;
});

/* Configure passport */
passport.use(new Strategy(
  (username, password, done) => {
    app.locals.users.findOne({ username }, (err, user) => {
      console.log(user);
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != authUtils.hashPassword(password)) {
        return done(null, false);
      }

      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  // done(null, { id });
  done(null, await app.locals.users.findOne({ _id: ObjectId(id) }))
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(multer().none())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Configure session, passport, flash */
// app.use(session({
//   secret: 'session secret',
//   resave: false,
//   saveUninitialized: false,
// }));
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Initialize socketIo
const io = socketio(server);
initializeChatRoom({ io, sessionMiddleware, passport });

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  next();
});

/* Add new routes */
app.post('/login', function (req, res, next) {
  let returnObject = {
    err: null,
    user: null
  }
  console.log(req.body);
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      returnObject.err = err;
      return res.send(returnObject);
    }
    if (!user) { return res.send(returnObject); }
    req.logIn(user, function (err) {
      if (err) {
        returnObject.err = err;
        return res.send(returnObject);
      }
      console.log('send');
      returnObject.user = user;
      res.send(returnObject);
    });
  })(req, res, next);
})
app.use('/registration', require('./registration/cloneRegistration'));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/auth', authRouter);
app.use('/case', require('./case/case')["default"]);


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