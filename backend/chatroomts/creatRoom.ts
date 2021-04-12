// import util from 'util'

export default ({
  socket,
  currentUser,
  usernameSocket,
  io,
}) => {
  let roomname = "create room";
  socket.on(roomname, ({
    username,
  }) => {
    console.log("yeah");
    let returnObject = {
      // usernameValid: false,
      // canFindUsers: false,
      roomid: null,
      success: false,
      serverError: true,
    };

    try {
      (() => {
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
        let newRoomId = Date.now();
        socket.join(newRoomId);
        usernameSocket.find(((obj) => obj.username === username))?.userSocket
          .join(newRoomId);

        //     users.find((user => user.userid === id)).roomids.unshift(newRoom.id);
        // })
        returnObject.roomid = newRoomId;
        returnObject.success = true;
    
        // }
      })();

      returnObject.serverError = false;
    } catch (error) {
      console.log(error);
      returnObject.serverError = true;
    } finally {
      socket.emit(roomname, returnObject);
      if (returnObject.success) {
        socket.broadcast.to(returnObject.roomid).emit(roomname, returnObject);
      }
    }
    // console.log(util.inspect(users, { showHidden: false, depth: null }))
    // console.log(util.inspect(chats, { showHidden: false, depth: null }))
  });
};
