// import util from 'util'

module.exports = ({
  socket,
  currentUser,
  usernameSocket,
  io,
  rooms
}) => {
  let eventName = "create room";
  socket.on(eventName, ({
    username,
  }) => {
    console.log("yeah");
    let returnObject = {
      usernameValid: false,
      usernameExist: false,
      roomid: null,
      success: false,
      serverError: true,
    };

    try {
      let newRoomId = Date.now();
      socket.join(newRoomId);
      let user = usernameSocket.find((obj) => obj.username === username);
      user?.userSocket.join(newRoomId);
      rooms.push({
        roomid: newRoomId,
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
