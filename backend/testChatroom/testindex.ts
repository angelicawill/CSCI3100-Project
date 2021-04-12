const path = require('path');
require('dotenv').config({ path: path.join(__dirname, "../", ".env") });
require('./testdata');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const sessionMiddleware = session({ secret: process.env.SESSION_SECRET || "changeit", resave: false, saveUninitialized: false });
const server = require("http").createServer(app);
const { initializePassport } = require('../authentication/authentication');
const { initializeChatRoom } = require('../chatroom/chatroom');
const passport = require('passport');
const xssFilters = require('xss-filters')

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const io = socketio(server);

// console.log(initializePassport)
initializePassport({ app });
initializeChatRoom({ io, sessionMiddleware });


app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            console.log("no user");
            return res.send({ login: "oops" });
        }

        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.send({ login: req.user.username });
        });
    })(req, res, next)
});


app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({
            msg: "user is not authenticated"
        })
    }
})

console.log(require('./testmodue'))
app.use('/case', require('../case/case').default);



server.listen(port, () => {
    console.log("server running on port: " + port);
});

