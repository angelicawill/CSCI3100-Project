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
            room: null,
            success: false,
            roomIdValid: false,
            messageIndexValid: false,
            canFindRoom: false,
            userIsInRoom: false,
            messageIndexExist: false,
            serverError: true,
        }

        let valid = true;
        try {
            if (typeof roomid == "number" && Number.isInteger(roomid)) {
                returnObject.roomIdValid = true;
            } else {
                valid = false;
            }

            console.log(typeof messageIndex)
            if (typeof messageIndex == "number" && messageIndex >= 0 && Number.isInteger(messageIndex)) {
                returnObject.messageIndexValid = true;
            } else {
                valid = false;
            }

            if (valid) {
                let dataExist = true;

                // Find corresponding room in database
                let room = chats.find((room) => room.id == roomid);
                if (room) {
                    returnObject.canFindRoom = true;
                } else {
                    dataExist = false
                }

                // Check user is in room
                console.log(room);
                let roomUser = room?.users.find((user) => user.userid == currentUser.userid)
                if (roomUser) {
                    returnObject.userIsInRoom = true;
                } else {
                    dataExist = false;
                }

                // Check have message
                if (room?.msg.length > messageIndex) {
                    returnObject.messageIndexExist = true;
                } else {
                    dataExist = false;
                }

                if (dataExist) {
                    let successUpdate = true;

                    let oldReadedIndex = room.users[room.users.findIndex((user) => user.userid == currentUser.userid)].readedIndex;

                    for (let i = oldReadedIndex + 1; i <= messageIndex; i++) {
                        room.msg[i].readedUserIds.push(currentUser.userid);
                    }

                    roomUser.readedIndex = messageIndex;
                    returnObject.room = room;
                    returnObject.success = successUpdate;
                }
            }
            returnObject.serverError = false;
        } catch (error) {
            console.log(error)
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