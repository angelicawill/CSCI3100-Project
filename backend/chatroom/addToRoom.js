"use strict";
exports.__esModule = true;
// const util = require('util')
var users, chats;
exports["default"] = (function (_a) {
    var socket = _a.socket, currentUser = _a.currentUser, useridSocket = _a.useridSocket, io = _a.io;
    var roomname = "add to room";
    socket.on(roomname, function (_a) {
        var roomid = _a.roomid, userids = _a.userids;
        var returnObject = {
            roomIdValid: false,
            useridsValid: false,
            canFindRoom: false,
            canFindUsers: false,
            userIsInRoom: false,
            room: null,
            success: false,
            serverError: true
        };
        try {
            (function () {
                var room;
                if (!currentUser) {
                    return;
                }
                else {
                    /***********   Check syntax valid   ***********/
                    if (typeof roomid === "number" && Number.isInteger(roomid)) {
                        returnObject.roomIdValid = true;
                    }
                    if (Array.isArray(userids) && userids.length && userids.every(function (id) {
                        return typeof id === "number" && Number.isInteger(id);
                    })) {
                        returnObject.useridsValid = true;
                    }
                }
                if (!returnObject.roomIdValid || !returnObject.useridsValid) {
                    return;
                }
                else {
                    /***********   Check data exist   ***********/
                    // Find corresponding room in database
                    room = chats.find(function (room) { return room.id === roomid; });
                    if (room) {
                        returnObject.canFindRoom = true;
                    }
                    // Check user is in room
                    if (room === null || room === void 0 ? void 0 : room.users.find(function (user) { return user.userid === currentUser.userid; })) {
                        returnObject.userIsInRoom = true;
                    }
                    // Find corresponding users in database
                    var canFindUsers_1 = true;
                    userids.forEach(function (id) {
                        if (!users.find((function (user) { return user.userid === id; }))) {
                            canFindUsers_1 = false;
                        }
                    });
                    if (canFindUsers_1) {
                        returnObject.canFindUsers = true;
                    }
                }
                if (!returnObject.canFindRoom || !returnObject.userIsInRoom ||
                    !returnObject.canFindUsers) {
                    return;
                }
                else {
                    /***********   Add to room   ***********/
                    var successUpdate = true;
                    userids.forEach(function (id) {
                        var _a;
                        if (!room.users.find(function (user) { return user.userid === id; })) {
                            // Update room
                            room.users.push({
                                userid: id,
                                readedIndex: -1
                            });
                            // Update users
                            (_a = useridSocket.find((function (obj) { return obj.userid === id; }))) === null || _a === void 0 ? void 0 : _a.userSocket.join(roomid);
                            users.find((function (user) { return user.userid === id; })).roomids.unshift(roomid);
                        }
                    });
                    returnObject.room = room;
                    returnObject.success = successUpdate;
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
            if (returnObject.success) {
                socket.broadcast.to(roomid).emit(roomname, returnObject);
            }
        }
        // console.log(util.inspect(users, { showHidden: false, depth: null }))
        // console.log(util.inspect(chats, { showHidden: false, depth: null }))
    });
});
