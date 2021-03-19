const socketio = require('socket.io');
const util = require('util')
// data for testing
let chats = [
    {
        id: 11,
        userIds: [1, 2],
        msg: [
            {
                sender: 1,
                value: "hi",
                time: 43857248453
            }
        ]
    },
    {
        id: 12,
        userIds: [1,3],
        msg: [
            {
                sender: 3,
                value: "hi",
                time: 43857248453
            }
        ]
    }
]

function initializeChatRoom(server, sessionMiddleware) {
    // const server = require('http').createServer(app);
    const io = socketio(server);
    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware));

    let userIdSocket = [];

    io.on('connection', (socket) => {
        console.log(io.sockets.connected)
        console.log(socket.id);
        if (socket.request.isAuthenticated()) {
            let user = socket.request.user;

            if (user.isVerified) {
                user.roomIds.forEach((e) => {
                    socket.join(e);
                });
                userIdSocket.push({
                    userId: user.userid,
                    userSocket: socket
                })

                /***********   add to room   ***********/
                // used on client: e.g. 
                // socket.emit('add to rom', {
                //     roomId: [11],
                //     userIds: [3],
                // });
                socket.on('add to room', ({
                    roomId,
                    userIds
                }) => {
                    let returnObject = {
                        room: null,
                        success: false
                    }

                    chats.find((room) => room.id == roomId)?.userIds.push(...userIds);

                    userIds.forEach(id => {
                        userIdSocket.find((obj => obj.userId == id))?.userSocket.join(roomId);

                        users.find((user => user.userid == id))?.roomIds.unshift(roomId);
                    })


                    io.to(roomId).emit('add to room', returnObject);

                    console.log(util.inspect(users, {showHidden: false, depth: null}))
                    console.log(util.inspect(chats, {showHidden: false, depth: null}))
                })


                /***********   create room   ***********/
                // used on client: e.g. 
                // socket.emit('create room', {
                //     userIds: [2, 3]
                // });
                socket.on('create room', ({
                    userIds,
                }) => {
                    let returnObject = {
                        room: null,
                        success: false
                    };


                    let newRoom = {
                        id: Date.now(),
                        userIds: userIds,
                        msg: []
                    }
                    chats.push(newRoom)
                    userIds.forEach((id) => {
                        userIdSocket.find((obj => obj.userId == id))?.userSocket.join(newRoom.id);
                        
                        users.find((user => user.userid == id))?.roomIds.unshift(newRoom.id);
                    })
                    returnObject.room = newRoom;
                    returnObject.success = true;
                    

                    io.to(returnObject.room.id).emit('create room', returnObject);

                    console.log(util.inspect(users, {showHidden: false, depth: null}))
                    console.log(util.inspect(chats, {showHidden: false, depth: null}))
                })



                /***********   send message   ***********/
                // used on client: e.g. 
                // socket.emit('send message', {
                //     roomId: 11,
                //     value: "hi"
                // });
                socket.on('send message', ({
                    roomId, // 
                    value
                }) => {
                    let returnObject = {
                        roomId: null,
                        messageIndex: null,
                        msg: null,
                        success: false,
                    }

                    // save room messages
                    let room = chats.find(e => e.id == roomId);
                    if (room) {
                        let newMessage = {
                            sender: user.userid,
                            readed: [user.userid],
                            value: value,
                            time: Date.now()
                        }

                        room.msg.unshift(newMessage);

                        room.userIds.forEach(e => {
                            let user = users.find(user => user.userid == e);
                            let roomIdIndex = user.roomIds.findIndex(roomId => roomId == room.id);

                            user.roomIds.unshift(user.roomIds.splice(roomIdIndex, 1)[0]);

                        })

                        returnObject.roomId = room.id;
                        returnObject.msg = newMessage;
                        returnObject.messageIndex = room.msg.length - 1;
                        returnObject.success = true;
                    }


                    io.to(roomId).emit('send message', returnObject);
                    console.log(util.inspect(users, {showHidden: false, depth: null}))
                    console.log(util.inspect(chats, {showHidden: false, depth: null}))
                })



                /***********   get rooms with messages  ***********/
                // used on client: e.g. 
                // socket.emit('get rooms', {
                //   roomIndexes: [0, 9],
                //   messagesIndex: [0, 9]
                // })
                socket.on('get rooms', ({
                    roomIndexes = null, // array e.g. [0, 5], specify an array of rooms with indexes 0 to 5 within user's data, newer first
                    id = null, // number e.g. 11
                    messagesIndex, // array e.g. [0, 5], specify an array of messages with indexes 0 to 5 within room, newer first
                }) => {
                    let returnObject = {
                        rooms: [],
                        success: false
                    }
                    if (roomIndexes) {
                        for (let i = roomIndexes[0]; i <= roomIndexes[1] && i < user.roomIds.length; i++) {
                            let room = findChatRoomById(user.roomIds[i], messagesIndex);
                            returnObject.rooms.push(room);
                        }

                        returnObject.success = true;
                    } else {
                        let room = findChatRoomById(id, messagesIndex);
                        returnObject.rooms.push(room);

                        returnObject.success = true;
                    }

                    io.to(socket.id).emit('get rooms', returnObject)
                    console.log(util.inspect(users, {showHidden: false, depth: null}))
                    console.log(util.inspect(chats, {showHidden: false, depth: null}))
                })
            } else {
                console.log("user is not verified");
                io.to(socket.id).emit('msg', {
                    msg: "user is not verified"
                });
            }
        } else {
            console.log("haven't logged in");
            io.to(socket.id).emit('msg', {
                msg: "haven't logged in"
            });
        }
    })

    return io;
}

function findChatRoomById(id, messagesIndex) {
    let returnRoom = null;
    if (messagesIndex) {
        room = chats.find(room => room.id == id);
        if (room) {
            returnRoom = {
                ...room,
                messageIndex: messagesIndex,
                msg: room.msg.slice(messagesIndex[0], messagesIndex[1] + 1)
            }
        }
    }

    return returnRoom;
}

module.exports = {
    // Initialize:
    // const session = require('express-session');
    // const sessionMiddleware = session({ secret: "changeit", resave: false, saveUninitialized: false });
    // const server = require("http").createServer(app);
    // initializeChatRoom(server, sessionMiddleware);
    initializeChatRoom: initializeChatRoom,
};