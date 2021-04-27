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
// });
// return: {
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
// return: {
//     roomid: number // (return the room id which the message is sent to)
//     value: string // (return the message that have been sent)
//     sender: string
//     time: number
//     allContents: {
//         sender: string
//         value: string
//         time: number
//     }[]
//     success: boolean
//     serverError: boolean
// }

// /***********   get message   ***********/
// used on client: e.g. 
// socket.emit('get message', {
//     "roomid": 11, // (The ID of the room that want to send message to)
// });
// return: {
//     roomid: number // (return the room id of the messages come from)
//     allContents: {
//         sender: string
//         value: string
//         time: number
//     }[]
//     success: boolean
//     serverError: boolean
// }


/**
 * @param {Server} io
 * @param {session} sessionMiddleware
 * @param {PassportStatic} passport 
 */
function initializeChatRoom(io, sessionMiddleware, passport) {
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
            const err = new Error("not authorized");
            err.data = { content: "not authorized" };
            next(err);

        }
    });

    // Check user have verified
    io.of(namespace).use((socket, next) => {
        if (socket.request.user.isVerified) {
            next();
        } else {
            const err = new Error("not verified");
            err.data = { content: "not verified" };
            next(err);

        }
    });

    // Initiate variables for chatroom
    let allUserRoomId = -1;
    let usernameSocket = [];
    let rooms = [
        {
            roomid: allUserRoomId,
            contents: []
        }
    ];

    // Listen for connection
    io.of(namespace).on('connection', (socket) => {
        let currentUser = socket.request.user;

        // Add user to usernameSocket
        if (!usernameSocket.find((a) => a.username == currentUser.username)) {
            usernameSocket.push({
                username: currentUser.username,
                userSocket: socket
            })
            socket.join(allUserRoomId);
        }

        let reference = {
            socket,
            currentUser,
            usernameSocket,
            rooms
        }

        // Listen for different events
        require('./creatRoom')(reference);
        require('./sendMessage')(reference);
        require('./getMessage')(reference);
        
        // Listen for disconnect
        socket.on("disconnect", (reason) => {
            console.log("client disconnected from chatroom");
            usernameSocket.splice(usernameSocket.findIndex((idsocket) => idsocket.username === currentUser.username), 1);
        });
    })
}

// Initialize:
// const server = require("http").createServer(require(express)());
// const sessionMiddleware = require('express-session')();
// const io = socketio(server);
// initializeChatRoom(io, sessionMiddleware, passport);
// server.listen(port);
module.exports = initializeChatRoom
