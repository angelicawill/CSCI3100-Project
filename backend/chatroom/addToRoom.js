const util = require('util')

module.exports = ({
    socket,
    currentUser,
    useridSocket,
    io,
    users,
    chats
}) => {
    let roomname = 'add to room';
    socket.on(roomname, ({
        roomid,
        userids
    }) => {
        let returnObject = {
            room: null,
            success: false,
            roomIdValid: false,
            useridsValid: false,
            canFindRoom: false,
            canFindUsers: false,
            userIsInRoom: false,
            serverError: true,
        }
        let valid = true;

        try {
            // Check roomid valid
            if (typeof roomid == "number" && Number.isInteger(roomid)) {
                returnObject.roomIdValid = true;
            } else {
                valid = false;
            }

            // Check userids valid
            if (Array.isArray(userids) && userids.length && userids.every(id => typeof id == "number" && Number.isInteger(id))) {
                returnObject.useridsValid = true;
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
                if (room?.users.find((user) => user.userid == currentUser.userid)) {
                    returnObject.userIsInRoom = true;
                } else {
                    dataExist = false;
                }

                // Find corresponding users in database
                let canFindUsers = true

                userids.forEach(id => {
                    if (!users.find((user => user.userid == id))) {
                        canFindUsers = false;
                    }
                })
                if (canFindUsers) {
                    returnObject.canFindUsers = true;
                } else {
                    dataExist = false;
                }


                // Update corresponding users and room
                if (dataExist) {
                    let successUpdate = true;
                    userids.forEach((id) => {
                        if (!room.users.find((user) => user.userid == id)) {
                            // Update room
                            room.users.push({
                                userid: id,
                                readedIndex: -1
                            })

                            // Update users 
                            useridSocket.find((obj => obj.userid == id))?.userSocket.join(roomid);

                            users.find((user => user.userid == id)).roomids.unshift(roomid);
                        }
                    })

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