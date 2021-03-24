
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
            useridsValid: false,
            canFindUsers: false,
            room: null,
            success: false,
            serverError: true
        };

        try {
            (() => {
                if (!currentUser) {
                    return;
                } else {
                    /***********   Check syntax valid   ***********/

                    if (Array.isArray(userids) && userids.length && userids.every(id => typeof id === "number" && Number.isInteger(id))) {
                        returnObject.useridsValid = true;
                    }
                }


                if (!returnObject.useridsValid) {
                    return;
                } else {
                    /***********   Check data exist   ***********/

                    // Find corresponding users in database
                    let canFindUsers = true
                    userids.forEach(id => {
                        if (!users.find((user => user.userid === id))) {
                            canFindUsers = false;
                        }
                    })

                    if (canFindUsers) {
                        returnObject.canFindUsers = true;
                    }
                }


                if (!returnObject.canFindUsers) {
                    return;
                } else {
                    /***********   Create room   ***********/

                    let successUpdate = true;

                    if (!userids.find(id => id === currentUser.userid)) {
                        userids.push(currentUser.userid)
                    }


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
                        useridSocket.find((obj => obj.userid === id))?.userSocket.join(newRoom.id);

                        users.find((user => user.userid === id)).roomids.unshift(newRoom.id);
                    })
                    returnObject.room = newRoom;
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
                socket.broadcast.to(returnObject.room.id).emit(roomname, returnObject);
            }
        }
        // console.log(util.inspect(users, { showHidden: false, depth: null }))
        // console.log(util.inspect(chats, { showHidden: false, depth: null }))
    })
}