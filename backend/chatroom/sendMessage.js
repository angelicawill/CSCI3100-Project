let { users, chats } = require('../test/testdata');
const util = require('util')

module.exports = ({
    socket,
    currentUser,
    useridSocket,
    io
}) => {
    let roomname = 'send message';
    socket.on(roomname, ({
        roomid, // 
        value
    }) => {
        let returnObject = {
            roomid: null,
            messageIndex: null,
            msg: null,
            success: false,
            roomIdValid: false,
            valueValid: false,
            canFindRoom: false,
            userIsInRoom: false,
            serverError: true,
        }

        let valid = true;
        try {
            if (typeof roomid == "number" && Number.isInteger(roomid)) {
                returnObject.roomIdValid = true;
            } else {
                valid = false;
            }

            if (typeof value == "string") {
                returnObject.valueValid = true;
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
                if (room?.users.find((user) => user.userid == currentUser.userid)) {
                    returnObject.userIsInRoom = true;
                } else {
                    dataExist = false;
                }

                if (dataExist) {
                    let successUpdate = true;

                    // Create new message
                    let newMessage = {
                        sender: currentUser.userid,
                        readedUserIds: [currentUser.userid],
                        value: value,
                        time: Date.now()
                    }

                    // Save message
                    room.msg.push(newMessage);

                    // Read previous messages
                    let oldReadedIndex = room.users[room.users.findIndex((user) => user.userid == currentUser.userid)].readedIndex;
                    console.log(oldReadedIndex)
                    for (let i = oldReadedIndex + 1; i < room.msg.length; i++) {
                        room.msg[i].readedUserIds.push(currentUser.userid);
                    }


                    room.users.forEach((ruser, index) => {
                        if (ruser.userid == currentUser.userid) {
                            room.users[index].readedIndex = room.msg.length - 1;
                        }

                        let duser = users.find(duser => duser.userid == ruser.userid);
                        let roomIdIndex = duser.roomids.findIndex(roomid => roomid == room.id);

                        duser.roomids.unshift(duser.roomids.splice(roomIdIndex, 1)[0]);

                    })

                    returnObject.roomid = room.id;
                    returnObject.msg = newMessage;
                    returnObject.messageIndex = room.msg.length - 1;
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