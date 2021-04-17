module.exports = ({
  socket,
  currentUser,
  rooms,
}) => {
  let eventName = "send message";
  socket.on(eventName, ({
    roomid, //
    value,
  }) => {
    let returnObject = {
      roomid: null,
      value: null,
      sender: null,
      time: null,
      allContents: [],
      success: false,
      serverError: true,
    };

    try {
      let room = rooms.find((room) => room.roomid == roomid);
      returnObject.time = Date.now();
      returnObject.roomid = roomid;
      returnObject.value = value;
      returnObject.sender = currentUser.username;
      returnObject.allContents = room.contents;
      room.contents.push({ sender: returnObject.sender, value: returnObject.value, time: returnObject.time });
      returnObject.success = true;

      returnObject.serverError = false;
    } catch (error) {
      console.log(error);
      returnObject.serverError = true;
    } finally {
      socket.emit(eventName, returnObject);

      if (returnObject.success) {
        socket.broadcast.to(roomid).emit(eventName, returnObject);
      }
    }
  });
};
