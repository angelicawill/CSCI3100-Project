module.exports = ({
  socket,
  usernameSocket,
  currentUser,
  rooms
}) => {
  let eventName = "create room";
  socket.on(eventName, ({
    username,
  }) => {
    let returnObject = {
      roomid: null,
      success: false,
      serverError: true,
    };

    try {
      /***********   check input syntax valid   ***********/
      if (typeof username != "string") {
        status = 400;
        return;
      }

      let newRoomId = Date.now();
      let user = usernameSocket.find((obj) => obj.username === username);
      /***********   check user have connected to chatroom   ***********/
      if (!user) {
        status = 200;
        return;
      }

      socket.join(newRoomId);
      user.userSocket.join(newRoomId);
      rooms.push({
        roomid: newRoomId,
        usernames: [username, currentUser.username],
        contents: []
      })

      returnObject.roomid = newRoomId;
      returnObject.success = true;
      returnObject.serverError = false;
    } catch (error) {
      console.log(error);
      returnObject.serverError = true;
    } finally {
      socket.emit(eventName, returnObject);
      if (returnObject.success) {
        socket.broadcast.to(returnObject.roomid).emit(eventName, returnObject);
      }
    }
  });
};
