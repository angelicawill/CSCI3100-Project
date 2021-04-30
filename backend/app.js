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

/* Connect to Database */
mongoose.connect("mongodb://localhost:27017/FindTutorDB", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open', () => {
  console.log("connected to mongodb");
})

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

app.use(express.static(path.join(__dirname, "testChatroom")));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "testChatroom", "index.html"))
})

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
app.use('/registration', require('./registration/registration'));

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
app.use((req, res, next) => {
  console.log('passed log in');
  next();
})
app.use('/case', require('./case/case'));


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
