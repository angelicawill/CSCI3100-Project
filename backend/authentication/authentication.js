const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let {users, chats} = require('../test/testdata');

function initializePassport() {
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    passport.serializeUser((user, done) => {
        done(null, user.userid);
    })

    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    })

    function authenticateUser(email, password, done) {
        const user = getUserByEmail(email);

        if (user == null) {
            console.log("no user with that email");
            return done(null, false, { message: "no user with that email" });
        }

        if (password == user.password) {
            return done(null, user)
        } else {
            return done(null, false, { message: "password incorrect" })
        }
    }

    // Access user from database using email
    function getUserByEmail(email) {
        let returnUser = null;
        users.forEach((user) => {
            if (user.email == email) {
                returnUser = user;
                console.log("success")
            }
        })
        return returnUser;
    }
    // Access user from database using id
    function getUserById(id) {
        let returnUser = null;
        users.forEach((user) => {
            if (user.userid == id) {
                returnUser = user;
            }
        })

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
// initializePassport();
module.exports = initializePassport;
    


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