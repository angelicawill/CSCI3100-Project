"use strict";
// import util from 'util'
exports.__esModule = true;
exports["default"] = (function (_a) {
    var socket = _a.socket, currentUser = _a.currentUser, useridSocket = _a.useridSocket, io = _a.io, users = _a.users, chats = _a.chats;
    var roomname = 'send message';
    socket.on(roomname, function (_a) {
        var roomid = _a.roomid, // 
        value = _a.value;
        var returnObject = {
            roomIdValid: false,
            valueValid: false,
            canFindRoom: false,
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
                    if (typeof value === "string") {
                        returnObject.valueValid = true;
                    }
                }
                if (!returnObject.roomIdValid || !returnObject.valueValid) {
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
                    if (room === null || room === void 0 ? void 0 : room.users.find(function (user) { return user.userid === currentUser.userid; })) {
                        returnObject.userIsInRoom = true;
                    }
                }
                if (!returnObject.canFindRoom || !returnObject.userIsInRoom) {
                    return;
                }
                else {
                    /***********   Send message   ***********/
                    var successUpdate = true;
                    // Create new message
                    var newMessage = {
                        sender: currentUser.userid,
                        readedUserIds: [currentUser.userid],
                        value: value,
                        time: Date.now()
                    };
                    // Save message
                    room.msg.push(newMessage);
                    // Read previous messages
                    var oldReadedIndex = room.users[room.users.findIndex(function (user) { return user.userid === currentUser.userid; })].readedIndex;
                    console.log(oldReadedIndex);
                    for (var i = oldReadedIndex + 1; i < room.msg.length; i++) {
                        room.msg[i].readedUserIds.push(currentUser.userid);
                    }
                    room.users.forEach(function (ruser, index) {
                        if (ruser.userid === currentUser.userid) {
                            room.users[index].readedIndex = room.msg.length - 1;
                        }
                        var duser = users.find(function (duser) { return duser.userid === ruser.userid; });
                        var roomIdIndex = duser.roomids.findIndex(function (roomid) { return roomid === room.id; });
                        duser.roomids.unshift(duser.roomids.splice(roomIdIndex, 1)[0]);
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
