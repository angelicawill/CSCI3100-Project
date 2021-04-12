// import util from 'util'
// const passport = require('passport');
// const globalObject: any = global;

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
function initializeChatRoom({io, sessionMiddleware, passport}) {
    let namespace = "/chatroom";
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    io.of(namespace).use(wrap(sessionMiddleware));
    io.of(namespace).use(wrap(passport.initialize()));
    io.of(namespace).use(wrap(passport.session()));

    // Check user have logged in
    io.of(namespace).use((socket, next) => {
        if (socket.request.isAuthenticated()) {
            next();
        } else {
            const err: any = new Error("not authorized");
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

    let usernameSocket = [];

    io.of(namespace).on('connection', (socket) => {
        let currentUser = socket.request.user;

        // currentUser.roomids.forEach((id) => {
        //     socket.join(id);
        // });
        // console.log(currentUser.userid);
        if (!usernameSocket.find((a) => a.username == currentUser.username)) {
            usernameSocket.push({
                username: currentUser.username,
                userSocket: socket
            })

        }
        

        let reference = {
            socket,
            currentUser,
            usernameSocket,
            io,
        }

        // require('./addToRoom').default(reference);
        require('./creatRoom').default(reference);
        require('./sendMessage').default(reference);
        // require('./getRoom').default(reference);
        // require('./readMessage').default(reference);

        socket.on("disconnect", (reason) => {
            console.log("client disconnected from chatroom");
            usernameSocket.splice(usernameSocket.findIndex((idsocket) => idsocket.username === currentUser.username), 1);
            console.log(usernameSocket);
        });
    })

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
export {};
