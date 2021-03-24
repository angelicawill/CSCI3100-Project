const util = require('util')

module.exports = ({
    socket,
    currentUser,
    useridSocket,
    io,
    users,
    chats
}) => {
    let roomname = 'get rooms';
    socket.on(roomname, ({
        roomIndexes = null,
        roomid = null,
    }) => {
        let returnObject = {
            rooms: [],
            success: false,
            roomIndexesValid: false,
            roomidValid: false,
            canFindRooms: false,
            userIsInRoom: false,
            serverError: true,
        }

        try {
            (() => {
                let rooms;

                if (!currentUser) {
                    return;
                } else {
                    /***********   Check syntax valid   ***********/

                    if (Array.isArray(roomIndexes) && roomIndexes.length === 2 && roomIndexes.every((index) => typeof index === "number" && Number.isInteger(index)) && roomIndexes[0] >= 0 && roomIndexes[1] >= roomIndexes[0]) {
                        returnObject.roomIndexesValid = true;
                    }

                    if (typeof roomid === "number" && Number.isInteger(roomid)) {
                        returnObject.roomidValid = true;
                    }
                }


                if (!returnObject.roomIndexesValid && !returnObject.roomidValid) {
                    return;
                } else {
                    /***********   Check data exist   ***********/

                    // Check have rooms
                    let canFindrooms = true;
                    let roomIdList;
                    if (returnObject.roomIndexesValid) {
                        roomIdList = currentUser.roomids.slice(roomIndexes[0], roomIndexes[1] + 1);
                    } else {
                        roomIdList = [roomid];
                    }
                    if (roomIdList.length === 0) {
                        canFindrooms = false;
                    }

                    rooms = roomIdList.map((id) => {
                        let room = chats.find(room => room.id === id);
                        if (!room) {
                            canFindrooms = false;
                        }
                        return room;
                    })

                    if (canFindrooms) {
                        returnObject.canFindRooms = true;
                    }

                    // Check user is in room
                    if (rooms.length && rooms.every(room => room.users.find((user => user.userid === currentUser.userid)))) {
                        returnObject.userIsInRoom = true;
                    }
                }

                if (!returnObject.canFindRooms || !returnObject.userIsInRoom) {
                    return;
                } else {
                    /***********   Get room   ***********/

                    returnObject.rooms = rooms;
                    success = true;
                }
            })()

            returnObject.serverError = false;
        } catch (error) {
            console.log(error);
            returnObject.serverError = true;
        } finally {
            socket.emit(roomname, returnObject);
        }
        // console.log(util.inspect(users, { showHidden: false, depth: null }))
        // console.log(util.inspect(chats, { showHidden: false, depth: null }))
    })
}