const util = require('util')

module.exports = ({
    socket,
    currentUser,
    useridSocket,
    io,
    users,
    chats
}) => {
    let roomname = 'send message';
    socket.on(roomname, ({
        roomid, // 
        value
    }) => {
        let returnObject = {
            roomIdValid: false,
            valueValid: false,
            canFindRoom: false,
            userIsInRoom: false,
            room: null,
            success: false,
            serverError: true,
        }

        try {
            (() => {
                if (!currentUser) {
                    return;
                } else {
                    /***********   Check syntax valid   ***********/
                    if (typeof roomid === "number" && Number.isInteger(roomid)) {
                        returnObject.roomIdValid = true;
                    }

                    if (typeof value === "string") {
                        returnObject.valueValid = true;
                    }
                }


                if (!returnObject.roomIdValid || !returnObject.valueValid) {
                    return;
                } else {
                    /***********   Check data exist   ***********/

                    let room = chats.find((room) => room.id === roomid);
                    if (room) {
                        returnObject.canFindRoom = true;
                    }

                    // Check user is in room
                    console.log(room);
                    if (room?.users.find((user) => user.userid === currentUser.userid)) {
                        returnObject.userIsInRoom = true;
                    }
                }


                if (!returnObject.canFindRoom || !returnObject.userIsInRoom) {
                    return;
                } else {
                    /***********   Send message   ***********/

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
                    let oldReadedIndex = room.users[room.users.findIndex((user) => user.userid === currentUser.userid)].readedIndex;
                    console.log(oldReadedIndex)
                    for (let i = oldReadedIndex + 1; i < room.msg.length; i++) {
                        room.msg[i].readedUserIds.push(currentUser.userid);
                    }


                    room.users.forEach((ruser, index) => {
                        if (ruser.userid === currentUser.userid) {
                            room.users[index].readedIndex = room.msg.length - 1;
                        }

                        let duser = users.find(duser => duser.userid === ruser.userid);
                        let roomIdIndex = duser.roomids.findIndex(roomid => roomid === room.id);

                        duser.roomids.unshift(duser.roomids.splice(roomIdIndex, 1)[0]);

                    })

                    returnObject.room = room
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