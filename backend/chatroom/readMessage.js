
const util = require('util')

module.exports = ({
    socket,
    currentUser,
    useridSocket,
    io,
    users,
    chats
}) => {
    let roomname = 'read message';
    socket.on(roomname, ({
        roomid, // 
        messageIndex
    }) => {
        let returnObject = {
            roomIdValid: false,
            messageIndexValid: false,
            canFindRoom: false,
            userIsInRoom: false,
            messageIndexExist: false,
            room: null,
            success: false,
            serverError: true,
        }

        try {
            (() => {
                let room;
                let roomUsers;

                if (!currentUser) {
                    return;
                } else {
                    /***********   Check syntax valid   ***********/

                    if (typeof roomid === "number" && Number.isInteger(roomid)) {
                        returnObject.roomIdValid = true;
                    }
                    if (typeof messageIndex === "number" && messageIndex >= 0 && Number.isInteger(messageIndex)) {
                        returnObject.messageIndexValid = true;
                    }
                }


                if (!returnObject.roomIdValid || !returnObject.messageIndexValid) {
                    return;
                } else {
                    /***********   Check data exist   ***********/

                    room = chats.find((room) => room.id === roomid);
                    if (room) {
                        returnObject.canFindRoom = true;
                    }

                    // Check user is in room
                    console.log(room);
                    roomUsers = room?.users.find((user) => user.userid === currentUser.userid)
                    if (roomUsers) {
                        returnObject.userIsInRoom = true;
                    }

                    // Check have message
                    if (room?.msg.length > messageIndex) {
                        returnObject.messageIndexExist = true;
                    }
                }


                if (!returnObject.canFindRoom || !returnObject.userIsInRoom || !returnObject.messageIndexExist) {
                    return;
                } else {
                    /***********   Read message   ***********/

                    let successUpdate = true;

                    let oldReadedIndex = room.users[room.users.findIndex((user) => user.userid === currentUser.userid)].readedIndex;

                    for (let i = oldReadedIndex + 1; i <= messageIndex; i++) {
                        room.msg[i].readedUserIds.push(currentUser.userid);
                    }

                    roomUsers.readedIndex = messageIndex;
                    returnObject.room = room;
                    returnObject.success = successUpdate;
                }
            })()

            returnObject.serverError = false;
        } catch (error) {
            console.log(error);
            returnObject.serverError = true;
        } finally {
            socket.emit(roomname, returnObject);
            if (returnObject.success) {
                socket.broadcast.to(roomid).emit(roomname, returnObject);
            }
        }
        // console.log(util.inspect(users, { showHidden: false, depth: null }))
        // console.log(util.inspect(chats, { showHidden: false, depth: null }))
    })
}