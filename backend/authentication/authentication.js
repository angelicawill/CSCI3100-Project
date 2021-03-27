"use strict";
exports.__esModule = true;
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var globalObject = global;
var _a = globalObject.dixontest, users = _a.users, chats = _a.chats, cases = _a.cases;
function initializePassport() {
    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser(function (user, done) {
        done(null, user.userid);
    });
    passport.deserializeUser(function (id, done) {
        return done(null, getUserById(id));
    });
    function authenticateUser(email, password, done) {
        var user = getUserByEmail(email);
        if (user === null) {
            console.log("no user with that email");
            return done(null, false, { message: "no user with that email" });
        }
        if (password === user.password) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: "password incorrect" });
        }
    }
    // Access user from database using email
    function getUserByEmail(email) {
        var returnUser = null;
        users.forEach(function (user) {
            if (user.email === email) {
                returnUser = user;
                console.log("success");
            }
        });
        return returnUser;
    }
    // Access user from database using id
    function getUserById(id) {
        var returnUser = null;
        users.forEach(function (user) {
            if (user.userid === id) {
                returnUser = user;
            }
        });
        return returnUser;
    }
}
// Initialize:
// const session = require('express-session');
// const passport = require('passport');
// const sessionMiddleware = session({ secret: "changeit", resave: false, saveUninitialized: false });
// app.use(sessionMiddleware);
// app.use(passport.initialize());
// app.use(passport.session());
// initializePassport{app}});
exports.initializePassport = initializePassport;
