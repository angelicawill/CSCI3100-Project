const util = require('util')
const passport = require('passport');
// test files in dixon-chatroom branch
// let {users, chats} = require('../test/testdata');

// Used by client:
// socket = io('/chatroom');
// Receive error on client side: 
// socket.on("connect_error", (err) => {
//     console.log(err instanceof Error); // true
//     console.log(err.message); // not authorized
//     console.log(err.data); // { content: "not authorized" }
// });
// /***********   add to room   ***********/
// used on client: e.g. 
// socket.emit('add to rom', {
//     "roomid": 12, // (The ID of the room want to add to)
//     "userids": [2],  // (A list of user IDs that want to add to the room)
// });
// return {
//     room: null, // (return the room object which the users are added to)
//     success: false,
//     roomIdValid: false,
//     useridsValid: false,
//     canFindRoom: false,
//     canFindUsers: false,
//     userIsInRoom: false // (Check the user sending request is in the room)
// }
// /***********   create room   ***********/
// used on client: e.g. 
// socket.emit('create room', {
//     "userids": [2, 3] // (A list of user IDs that want to include in the new room)
// });
// return {
//     room: null, // (return the room object which the users are added to)
//     success: false,
//     useridsValid: false,
//     canFindUsers: false
// };
// /***********   send message   ***********/
// used on client: e.g. 
// socket.emit('send message', {
//     "roomid": 11, // (The ID of the room that want to send message to)
//     "value": "hi" // (The value of the message that want to send)
// });
// return {
//     room: // (Return the room that have added new message)
//     success: false,
//     roomIdValid: false,
//     valueValid: false,
//     canFindRoom: false,
//     userIsInRoom: false, // (Check the user sending request is in the room)
//     serverError: true, 
// }
// /***********   get rooms   ***********/
// socket.emit('get rooms', ({
//     "roomIndexes":[1,4] or "roomid":11 // (Get the room objects, roomIndexes will get the array of room objects according to the room IDs stored in the user database, roomid will get the array containing one room object)
// })
// return {
//     rooms: [], // (return a array of room objects that want to get)
//     success: false,
//     roomIndexesValid: false,
//     roomidValid: false,
//     canFindRooms: false,
//     userIsInRoom: false, // (Check the user sending request is in the room)
//     serverError: true,
// }
// /***********   read message   ***********/
// socket.emit('read message', ({
//     "roomid":11, // (The ID of the room that want to change message status to readed)
//     "messageIndex": 0 // (The index of the newest message that have been readed, all older messages will also be changed to readed)
// })
// return {
//     roomid: null, // (The ID of the room that want to change message status to readed)
//     room: null, // (The room that have changed message status)
//     success: false,
//     roomIdValid: false,
//     messageIndexValid: false,
//     canFindRoom: false,
//     userIsInRoom: false, // (Check the user sending request is in the room)
//     messageIndexExist: false, 
//     serverError: true,
// }
function initializeChatRoom({io, sessionMiddleware, app}) {
    app.locals.dixontest ? "" : app.locals.dixontest = {};
    app.locals.dixontest.chats = [
        {
            id: 11,
            users: [
                {
                    userid: 1,
                    readedIndex: 0
                },
                {
                    userid: 2,
                    readedIndex: -1
                }
            ],
            msg: [
                {
                    sender: 1,
                    readedUserIds: [1],
                    value: "hi",
                    time: 43857248453
                }
            ]
        },
        {
            id: 12,
            users: [
                {
                    userid: 1,
                    readedIndex: 0
                },
            ],
            msg: [
                {
                    sender: 1,
                    readedUserIds: [1],
                    value: "bye",
                    time: 43857248453
                }
            ]
        }
    ]
    const {chats, users} = app.locals.dixontest;
    console.log("in chat room");
    console.log(users);

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

    let useridSocket = [];

    io.of(namespace).on('connection', (socket) => {
        let currentUser = socket.request.user;

        currentUser.roomids.forEach((id) => {
            socket.join(id);
        });
        console.log(currentUser.userid);
        useridSocket.push({
            userid: currentUser.userid,
            userSocket: socket
        })

        let reference = {
            socket,
            currentUser,
            useridSocket,
            io,
            users,
            chats
        }

        require('./addToRoom')(reference);
        require('./creatRoom')(reference);
        require('./sendMessage')(reference);
        require('./getRoom')(reference);
        require('./readMessage')(reference);

        socket.on("disconnect", (reason) => {
            console.log("client disconnected from chatroom");
            useridSocket.splice(useridSocket.findIndex((idsocket) => idsocket.userid == currentUser.userid), 1);
            console.log(useridSocket);
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
module.exports = initializeChatRoom;
