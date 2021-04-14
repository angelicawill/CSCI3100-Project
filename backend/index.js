require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require("passport");
const socketio = require('socket.io');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const initializePassport = require('./authentication/authentication').initializePassport;
const initializeChatRoom = require('./chatroom/chatroom').initializeChatRoom;
const {addUser} = require('./database/user');

const app = express();
var router = express.Router();
const server = require("http").createServer(app);

const port = process.env.PORT || 5000;
const sessionMiddleware = session({ secret: process.env.SESSION_SECRET || "secret", resave: false, saveUninitialized: false });


app.use(sessionMiddleware);

// Initialize passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Initialize mongoose
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

// Initialize socketIo
const io = socketio(server);
initializeChatRoom({ io, sessionMiddleware, passport });

// app use middleware
app.use(express.json());
app.use(express.text());
app.use(multer().none())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'testChatroom')))

// Route for testing
app.all('*', (req, res, next) => {
  console.log('getted request');
  next();
})

app.get('/testchatroom', (req, res) => {
  console.log("testing")
  res.sendFile(path.join(__dirname, 'testChatroom', 'index.html'));
});

// Route for testing end

// Route for before login
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

app.use('/registration', require('./registration/cloneRegistration'))


// Check login
app.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send({
      msg: "not authenticated"
    })
  }
  next();
})


// Route for after login
app.use('/case', require('./case/case')["default"]);

app.all('*', (req, res) => {
  res.status(404).send({
    msg: "do not have that route"
  })
})

server.listen(port, () => {
  console.log("server running on port: " + port);
});

// router.get('/', function (req, res, next) {
//   const users = req.app.locals.users;

//   users.find().limit(3).toArray((err, recent) => {
//     res.render('index', { recent });
//   });
// });

// module.exports = router;
