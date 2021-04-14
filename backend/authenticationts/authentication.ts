const LocalStrategy = require("passport-local").Strategy;
const globalObject: any = global;
const { getUserBasicInfo } = require("../database/user");
const { hashPassword } = require("../hashPassword");

function initializePassport(passport) {
  passport.use(
    new LocalStrategy({
      usernameField: "username",
    }, async (username, password, done) => {
      console.log(username)
      const user = await getUserBasicInfo({ username: username });
      if (user === null) {
        console.log("no user with that username");
        return done(null, false, { message: "no user with that username" });
      }
      console.log(user)
      if (hashPassword(password) === user.password) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password incorrect" });
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser(async (username, done) => {
    let user = await getUserBasicInfo({ username: username });
    return done(null, user);
  });

  // Access user from database using email
  // function getUserByEmail(email) {
  //   let returnUser = null;
  //   users.forEach((user) => {
  //     if (user.email === email) {
  //       returnUser = user;
  //       console.log("success");
  //     }
  //   });
  //   return returnUser;
  // }
  // // Access user from database using id
  // function getUserById(id) {
  //   let returnUser = null;
  //   users.forEach((user) => {
  //     if (user.userid === id) {
  //       returnUser = user;
  //     }
  //   });

  //   return returnUser;
  // }
}

// Initialize:
// const session = require('express-session');
// const passport = require('passport');
// const sessionMiddleware = session({ secret: "changeit", resave: false, saveUninitialized: false });
// app.use(sessionMiddleware);
// app.use(passport.initialize());
// app.use(passport.session());
// initializePassport(passport));
exports.initializePassport = initializePassport;
// Login:
// app.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });
// logout : req.logOut()
// check have been authenticated : req.isAuthenticated()
// get user info : req.user
export {};
