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

        let valid = true;
        try {
            // Check roomIndexes and roomid valid
            console.log(roomIndexes)
            if (Array.isArray(roomIndexes) && roomIndexes.length == 2 && roomIndexes.every((index) => typeof index == "number" && Number.isInteger(index)) && roomIndexes[0] >= 0 && roomIndexes[1] >= roomIndexes[0]) {
                returnObject.roomIndexesValid = true;
            }

            if (typeof roomid == "number" && Number.isInteger(roomid)) {
                returnObject.roomidValid = true;
            }

            if (!returnObject.roomIndexesValid && !returnObject.roomidValid) {
                valid = false;
            }

            if (valid) {
                let dataExist = true;

                // Check have rooms
                let canFindrooms = true;
                let roomIdList;
                if (returnObject.roomIndexesValid) {
                    roomIdList = currentUser.roomids.slice(roomIndexes[0], roomIndexes[1] + 1);
                } else {
                    roomIdList = [roomid];
                }
                if (roomIdList.length == 0) {
                    canFindrooms = false;
                }
                console.log(roomIdList);

                let rooms = roomIdList.map((id) => {
                    let room = chats.find(room => room.id == id);
                    if (!room) {
                        canFindrooms = false;
                    }
                    return room;
                })

                if (canFindrooms) {
                    returnObject.canFindRooms = true;
                } else {
                    dataExist = false;
                }

                // Check user is in room
                if (rooms.length && rooms.every(room => room.users.find((user => user.userid == currentUser.userid)))) {
                    returnObject.userIsInRoom = true;
                } else {
                    dataExist = false;
                }

                if (dataExist) {
                    returnObject.rooms = rooms;
                    success = true;
                }

            }

            returnObject.serverError = false;
        } catch (error) {
            console.log(error)
        } finally {
            socket.emit(roomname, returnObject);
        }
        // console.log(util.inspect(users, { showHidden: false, depth: null }))
        // console.log(util.inspect(chats, { showHidden: false, depth: null }))
    })
}