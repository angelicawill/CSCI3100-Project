"use strict";
exports.__esModule = true;
exports["default"] = (function (_a) {
    var socket = _a.socket, currentUser = _a.currentUser, useridSocket = _a.useridSocket, io = _a.io, rooms = _a.rooms;
    var roomname = 'get message';
    socket.on(roomname, function (_a) {
        var roomid = _a.roomid;
        var returnObject = {
            roomid: null,
            allContents: [],
            success: false,
            serverError: true
        };
        try {
            var room = rooms.find(function (room) { return room.roomid == roomid; });
            returnObject.roomid = roomid;
            returnObject.allContents = room.contents;
            returnObject.success = true;
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
