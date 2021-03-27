"use strict";
// import util from 'util'
exports.__esModule = true;
exports["default"] = (function (_a) {
    var socket = _a.socket, currentUser = _a.currentUser, useridSocket = _a.useridSocket, io = _a.io, users = _a.users, chats = _a.chats;
    var roomname = 'read message';
    socket.on(roomname, function (_a) {
        var roomid = _a.roomid, // 
        messageIndex = _a.messageIndex;
        var returnObject = {
            roomIdValid: false,
            messageIndexValid: false,
            canFindRoom: false,
            userIsInRoom: false,
            messageIndexExist: false,
            room: null,
            success: false,
            serverError: true
        };
        try {
            (function () {
                var room;
                var roomUsers;
                if (!currentUser) {
                    return;
                }
                else {
                    /***********   Check syntax valid   ***********/
                    if (typeof roomid === "number" && Number.isInteger(roomid)) {
                        returnObject.roomIdValid = true;
                    }
                    if (typeof messageIndex === "number" && messageIndex >= 0 && Number.isInteger(messageIndex)) {
                        returnObject.messageIndexValid = true;
                    }
                }
                if (!returnObject.roomIdValid || !returnObject.messageIndexValid) {
                    return;
                }
                else {
                    /***********   Check data exist   ***********/
                    room = chats.find(function (room) { return room.id === roomid; });
                    if (room) {
                        returnObject.canFindRoom = true;
                    }
                    // Check user is in room
                    console.log(room);
                    roomUsers = room === null || room === void 0 ? void 0 : room.users.find(function (user) { return user.userid === currentUser.userid; });
                    if (roomUsers) {
                        returnObject.userIsInRoom = true;
                    }
                    // Check have message
                    if ((room === null || room === void 0 ? void 0 : room.msg.length) > messageIndex) {
                        returnObject.messageIndexExist = true;
                    }
                }
                if (!returnObject.canFindRoom || !returnObject.userIsInRoom || !returnObject.messageIndexExist) {
                    return;
                }
                else {
                    /***********   Read message   ***********/
                    var successUpdate = true;
                    var oldReadedIndex = room.users[room.users.findIndex(function (user) { return user.userid === currentUser.userid; })].readedIndex;
                    for (var i = oldReadedIndex + 1; i <= messageIndex; i++) {
                        room.msg[i].readedUserIds.push(currentUser.userid);
                    }
                    roomUsers.readedIndex = messageIndex;
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
