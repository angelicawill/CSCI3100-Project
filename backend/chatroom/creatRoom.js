"use strict";
// import util from 'util'
exports.__esModule = true;
exports["default"] = (function (_a) {
    var socket = _a.socket, currentUser = _a.currentUser, usernameSocket = _a.usernameSocket, io = _a.io, rooms = _a.rooms;
    var roomname = "create room";
    socket.on(roomname, function (_a) {
        var username = _a.username;
        console.log("yeah");
        var returnObject = {
            // usernameValid: false,
            // canFindUsers: false,
            roomid: null,
            success: false,
            serverError: true
        };
        try {
            //   (() => {
            // if (!currentUser) {
            //     return;
            // } else {
            //     /***********   Check syntax valid   ***********/
            //     // if (Array.isArray(userids) && userids.length && userids.every(id => typeof id === "number" && Number.isInteger(id))) {
            //     //     returnObject.useridsValid = true;
            //     // }
            // }
            // if (!returnObject.useridsValid) {
            //     return;
            // } else {
            //     /***********   Check data exist   ***********/
            //     // Find corresponding users in database
            //     let canFindUsers = true
            //     // userids.forEach(id => {
            //     //     if (!users.find((user => user.userid === id))) {
            //     //         canFindUsers = false;
            //     //     }
            //     // })
            //     // if (canFindUsers) {
            //     //     returnObject.canFindUsers = true;
            //     // }
            // }
            // if (!returnObject.canFindUsers) {
            //     return;
            // } else {
            /***********   Create room   ***********/
            // let successUpdate = true;
            // if (!userids.find(id => id === currentUser.userid)) {
            //     userids.push(currentUser.userid)
            // }
            // let newRoom = {
            //     id: Date.now(),
            //     users: userids.map((id) => {
            //         return {
            //             userid: id,
            //             readedIndex: -1
            //         }
            //     }),
            //     msg: []
            // }
            // chats.push(newRoom)
            // userids.forEach((id) => {
            var newRoomId = Date.now();
            socket.join(newRoomId);
            console.log(usernameSocket);
            var user = usernameSocket.find(function (obj) { return obj.username === username; });
            console.log(user);
            user === null || user === void 0 ? void 0 : user.userSocket.join(newRoomId);
            rooms.push({
                roomid: newRoomId,
                contents: []
            });
            //     users.find((user => user.userid === id)).roomids.unshift(newRoom.id);
            // })
            returnObject.roomid = newRoomId;
            returnObject.success = true;
            // }
            //   })();
            returnObject.serverError = false;
        }
        catch (error) {
            console.log(error);
            returnObject.serverError = true;
        }
        finally {
            socket.emit(roomname, returnObject);
            if (returnObject.success) {
                socket.broadcast.to(returnObject.roomid).emit(roomname, returnObject);
            }
        }
        // console.log(util.inspect(users, { showHidden: false, depth: null }))
        // console.log(util.inspect(chats, { showHidden: false, depth: null }))
    });
});
