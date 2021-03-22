
const util = require('util')

module.exports = ({
    socket,
    currentUser,
    useridSocket,
    io,
    users,
    chats
}) => {
    let roomname = 'create room';
    socket.on(roomname, ({
        userids,
    }) => {
        console.log("yeah");
        let returnObject = {
            room: null,
            success: false,
            useridsValid: false,
            canFindUsers: false,
            serverError: true,
        };
        let valid = true;
        try {        // Check userids valid
            if (Array.isArray(userids) && userids.length && userids.every(id => typeof id == "number" && Number.isInteger(id))) {
                returnObject.useridsValid = true;
            } else {
                valid = false;
            }

            if (valid) {
                let dataExist = true;

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

                if (dataExist) {
                    let successUpdate = true;

                    if (!userids.find(id => id == currentUser.userid)) {
                        userids.push(currentUser.userid)
                    }

                    // Create room
                    let newRoom = {
                        id: Date.now(),
                        users: userids.map((id) => {
                            return { 
                                userid: id, 
                                readedIndex: -1
                            }
                        }),
                        msg: []
                    }

                    chats.push(newRoom)
                    userids.forEach((id) => {
                        useridSocket.find((obj => obj.userid == id))?.userSocket.join(newRoom.id);

                        users.find((user => user.userid == id)).roomids.unshift(newRoom.id);
                    })
                    returnObject.room = newRoom;
                    returnObject.success = successUpdate;
                }
            }
            console.log(returnObject)
            returnObject.serverError = false;
        } catch (error) {
            console.log(error)
        } finally {
            socket.emit(roomname, returnObject);
            if (returnObject.success) {
                socket.broadcast.to(returnObject.room.id).emit(roomname, returnObject);
            }
        }
        // console.log(util.inspect(users, { showHidden: false, depth: null }))
        // console.log(util.inspect(chats, { showHidden: false, depth: null }))
    })
}