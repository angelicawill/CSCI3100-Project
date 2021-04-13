"use strict";
// import util from 'util'
// const passport = require('passport');
// const globalObject: any = global;
exports.__esModule = true;
// Used by client:
// socket = io('/chatroom');
// Receive error on client side: 
// socket.on("connect_error", (err) => {
//     console.log(err instanceof Error); // true
//     console.log(err.message); // not authorized
//     console.log(err.data); // { content: "not authorized" }
// });
// /***********   create room   ***********/
// used on client: e.g. 
// socket.emit('create room', {
//     "username": "user" // username of another user want to add to room
// return {
//     roomid: number, // (return the room id which the users are added to)
//     success: boolean,
//     serverError: boolean
// };
// /***********   send message   ***********/
// used on client: e.g. 
// socket.emit('send message', {
//     "roomid": 11, // (The ID of the room that want to send message to)
//     "value": "hi" // (The value of the message that want to send)
// });
// return {
//     roomid: number // (return the room id which the message is sent to)
//     value: string // (return the message that have been sent)
//     success: boolean,
//     serverError: boolean, 
// }
function initializeChatRoom(_a) {
    var io = _a.io, sessionMiddleware = _a.sessionMiddleware, passport = _a.passport;
    var namespace = "/chatroom";
    var wrap = function (middleware) { return function (socket, next) { return middleware(socket.request, {}, next); }; };
    io.of(namespace).use(wrap(sessionMiddleware));
    io.of(namespace).use(wrap(passport.initialize()));
    io.of(namespace).use(wrap(passport.session()));
    // Check user have logged in
    io.of(namespace).use(function (socket, next) {
        if (socket.request.isAuthenticated()) {
            next();
        }
        else {
            var err = new Error("not authorized");
            err.data = { content: "not authorized" };
            next(err);
        }
    });
    // // Check user have verified
    // io.of(namespace).use((socket, next) => {
    //     if (socket.request.user.isVerified) {
    //         next();
    //     } else {
    //         const err: any = new Error("not verified");
    //         err.data = { content: "not verified" };
    //         next(err);
    //     }
    // });
    var usernameSocket = [];
    io.of(namespace).on('connection', function (socket) {
        var currentUser = socket.request.user;
        console.log('client connected');
        if (!usernameSocket.find(function (a) { return a.username == currentUser.username; })) {
            usernameSocket.push({
                username: currentUser.username,
                userSocket: socket
            });
        }
        console.log(usernameSocket);
        var reference = {
            socket: socket,
            currentUser: currentUser,
            usernameSocket: usernameSocket,
            io: io
        };
        // require('./addToRoom').default(reference);
        require('./creatRoom')["default"](reference);
        require('./sendMessage')["default"](reference);
        // require('./getRoom').default(reference);
        // require('./readMessage').default(reference);
        socket.on("disconnect", function (reason) {
            console.log("client disconnected from chatroom");
            usernameSocket.splice(usernameSocket.findIndex(function (idsocket) { return idsocket.username === currentUser.username; }), 1);
            console.log(usernameSocket);
        });
    });
}
// Initialize:
// const session = require('express-session');
// const sessionMiddleware = session({ secret: "changeit", resave: false, saveUninitialized: false });
// const io = socketio(server);
// initializeChatRoom({io, sessionMiddleware, app});
// server.listen(port, () => {
//     console.log("server running on port: " + port);
// });
exports.initializeChatRoom = initializeChatRoom;
