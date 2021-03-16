const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// data for testing
const users = [
    {
        "_id": "1615912804405",
        "type": "student",
        "phone": "11111111",
        "name": "name1",
        "email": "name1@gmail.com",
        "password": "name1"
    },
    {
        "_id": "1615914206670",
        "type": "teacher",
        "phone": "22222222",
        "name": "name2",
        "email": "name2@gmail.com",
        "password": "name2"
    }
]

function initializePassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    })

    function authenticateUser(email, password, done) {
        const user = getUserByEmail(email);

        if (user == null) {
            return done(null, false, { message: "no user with that email" });
        }

        if (password == user.password) {
            return done(null, user)
        } else {
            return done(null, false, { message: "password incorrect" })
        }
    }

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

    function getUserById(id) {
        let returnUser = null;
        users.forEach((user) => {
            if (user._id == id) {
                returnUser = user;
            }
        })

        return returnUser;
    }
}

function authenticate(successPath, failPath) {
    return passport.authenticate('local', {
        successRedirect: successPath,
        failureRedirect: failPath
    })
}


module.exports = {
    // app.use(session({
    //     secret: "secret",
    //     resave: false,
    //     saveUninitialized: false
    // }))
    // initializePassport(app);
    initializePassport: initializePassport,

    // app.post('/login', authenticate('/', '/login'))
    authenticate: authenticate
};

// logout : req.logOut()
// check have been authenticated : req.isAuthenticated()
// get user info : req.user