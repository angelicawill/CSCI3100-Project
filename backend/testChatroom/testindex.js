// var path = require('path');
// require('dotenv').config({ path: path.join(__dirname, "../", ".env") });
// require('./testdata');
// var express = require('express');
// var socketio = require('socket.io');
// var app = express();
// var port = process.env.PORT || 5000;
// // var session = require('express-session');
// // var sessionMiddleware = session({ secret: process.env.SESSION_SECRET || "changeit", resave: false, saveUninitialized: false });
// // var server = require("http").createServer(app);
// // var initializePassport = require('../authentication/authentication').initializePassport;
// // var initializeChatRoom = require('../chatroom/chatroom').initializeChatRoom;
// // var passport = require('passport');
// // app.use(sessionMiddleware);
// // app.use(passport.initialize());
// // app.use(passport.session());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(express.json());
// // var io = socketio(server);
// // // console.log(initializePassport)
// // initializePassport(passport);
// // initializeChatRoom({ io: io, sessionMiddleware: sessionMiddleware });
// // app.use(express.static(__dirname));
// // app.get('/', function (req, res) {
// //     res.sendFile(path.join(__dirname, 'index.html'));
// // });
// // app.post('/login', function (req, res, next) {
// //     passport.authenticate('local', function (err, user, info) {
// //         if (err) {
// //             return next(err);
// //         }
// //         if (!user) {
// //             console.log("no user");
// //             return res.send({ login: "oops" });
// //         }
// //         req.logIn(user, function (err) {
// //             if (err) {
// //                 return next(err);
// //             }
// //             return res.send({ login: req.user.username });
// //         });
// //     })(req, res, next);
// // });
// // app.use(function (req, res, next) {
// //     if (req.isAuthenticated()) {
// //         next();
// //     }
// //     else {
// //         res.send({
// //             msg: "user is not authenticated"
// //         });
// //     }
// // });
// // console.log(require('./testmodue'));
// // app.use('/case', require('../case/case')["default"]);

// app.all('*', () => {
//     console.log("getted all")
// })
// app.listen(port, function () {
//     console.log("server running on port: " + port);
// });

// const { hashPassword } = require('../hashPassword');
// console.log(hashPassword("a") == hashPassword("a"));
// console.log(hashPassword("a"));