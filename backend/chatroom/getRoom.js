"use strict";
// import util from 'util'
exports.__esModule = true;
exports["default"] = (function (_a) {
    var socket = _a.socket, currentUser = _a.currentUser, useridSocket = _a.useridSocket, io = _a.io, users = _a.users, chats = _a.chats;
    var roomname = 'get rooms';
    socket.on(roomname, function (_a) {
        var _b = _a.roomIndexes, roomIndexes = _b === void 0 ? null : _b, _c = _a.roomid, roomid = _c === void 0 ? null : _c;
        var returnObject = {
            rooms: [],
            success: false,
            roomIndexesValid: false,
            roomidValid: false,
            canFindRooms: false,
            userIsInRoom: false,
            serverError: true
        };
        try {
            (function () {
                var rooms;
                if (!currentUser) {
                    return;
                }
                else {
                    /***********   Check syntax valid   ***********/
                    if (Array.isArray(roomIndexes) && roomIndexes.length === 2 && roomIndexes.every(function (index) { return typeof index === "number" && Number.isInteger(index); }) && roomIndexes[0] >= 0 && roomIndexes[1] >= roomIndexes[0]) {
                        returnObject.roomIndexesValid = true;
                    }
                    if (typeof roomid === "number" && Number.isInteger(roomid)) {
                        returnObject.roomidValid = true;
                    }
                }
                if (!returnObject.roomIndexesValid && !returnObject.roomidValid) {
                    return;
                }
                else {
                    /***********   Check data exist   ***********/
                    // Check have rooms
                    var canFindrooms_1 = true;
                    var roomIdList = void 0;
                    if (returnObject.roomIndexesValid) {
                        roomIdList = currentUser.roomids.slice(roomIndexes[0], roomIndexes[1] + 1);
                    }
                    else {
                        roomIdList = [roomid];
                    }
                    if (roomIdList.length === 0) {
                        canFindrooms_1 = false;
                    }
                    rooms = roomIdList.map(function (id) {
                        var room = chats.find(function (room) { return room.id === id; });
                        if (!room) {
                            canFindrooms_1 = false;
                        }
                        return room;
                    });
                    if (canFindrooms_1) {
                        returnObject.canFindRooms = true;
                    }
                    // Check user is in room
                    if (rooms.length && rooms.every(function (room) { return room.users.find((function (user) { return user.userid === currentUser.userid; })); })) {
                        returnObject.userIsInRoom = true;
                    }
                }
                if (!returnObject.canFindRooms || !returnObject.userIsInRoom) {
                    return;
                }
                else {
                    /***********   Get room   ***********/
                    returnObject.rooms = rooms;
                    returnObject.success = true;
                }
            })();
            returnObject.serverError = false;
        }
        catch (error) {
            console.log(error);
            returnObject.serverError = true;
        }
        finally {
            socket.emit(roomname, returnObject);
        }
        // console.log(util.inspect(users, { showHidden: false, depth: null }))
        // console.log(util.inspect(chats, { showHidden: false, depth: null }))
    });
});
