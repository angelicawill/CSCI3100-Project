"use strict";
// import util from 'util'
exports.__esModule = true;
exports["default"] = (function (_a) {
    var socket = _a.socket, currentUser = _a.currentUser, useridSocket = _a.useridSocket, io = _a.io, users = _a.users, chats = _a.chats;
    var roomname = 'create room';
    socket.on(roomname, function (_a) {
        var userids = _a.userids;
        console.log("yeah");
        var returnObject = {
            useridsValid: false,
            canFindUsers: false,
            room: null,
            success: false,
            serverError: true
        };
        try {
            (function () {
                if (!currentUser) {
                    return;
                }
                else {
                    /***********   Check syntax valid   ***********/
                    if (Array.isArray(userids) && userids.length && userids.every(function (id) { return typeof id === "number" && Number.isInteger(id); })) {
                        returnObject.useridsValid = true;
                    }
                }
                if (!returnObject.useridsValid) {
                    return;
                }
                else {
                    /***********   Check data exist   ***********/
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
                if (!returnObject.canFindUsers) {
                    return;
                }
                else {
                    /***********   Create room   ***********/
                    var successUpdate = true;
                    if (!userids.find(function (id) { return id === currentUser.userid; })) {
                        userids.push(currentUser.userid);
                    }
                    var newRoom_1 = {
                        id: Date.now(),
                        users: userids.map(function (id) {
                            return {
                                userid: id,
                                readedIndex: -1
                            };
                        }),
                        msg: []
                    };
                    chats.push(newRoom_1);
                    userids.forEach(function (id) {
                        var _a;
                        (_a = useridSocket.find((function (obj) { return obj.userid === id; }))) === null || _a === void 0 ? void 0 : _a.userSocket.join(newRoom_1.id);
                        users.find((function (user) { return user.userid === id; })).roomids.unshift(newRoom_1.id);
                    });
                    returnObject.room = newRoom_1;
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
                socket.broadcast.to(returnObject.room.id).emit(roomname, returnObject);
            }
        }
        // console.log(util.inspect(users, { showHidden: false, depth: null }))
        // console.log(util.inspect(chats, { showHidden: false, depth: null }))
    });
});
