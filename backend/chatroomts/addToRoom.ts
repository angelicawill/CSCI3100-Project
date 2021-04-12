// const util = require('util')
let users, chats;

export default ({
  socket,
  currentUser,
  useridSocket,
  io,
}) => {
  let roomname = "add to room";
  socket.on(roomname, ({
    roomid,
    userids,
  }) => {
    let returnObject = {
      roomIdValid: false,
      useridsValid: false,
      canFindRoom: false,
      canFindUsers: false,
      userIsInRoom: false,
      room: null,
      success: false,
      serverError: true,
    };

    try {
      (() => {
        let room;

        if (!currentUser) {
          return;
        } else {
          /***********   Check syntax valid   ***********/

          if (typeof roomid === "number" && Number.isInteger(roomid)) {
            returnObject.roomIdValid = true;
          }

          if (
            Array.isArray(userids) && userids.length && userids.every((id) =>
              typeof id === "number" && Number.isInteger(id)
            )
          ) {
            returnObject.useridsValid = true;
          }
        }

        if (!returnObject.roomIdValid || !returnObject.useridsValid) {
          return;
        } else {
          /***********   Check data exist   ***********/

          // Find corresponding room in database
          room = chats.find((room) => room.id === roomid);
          if (room) {
            returnObject.canFindRoom = true;
          }

          // Check user is in room
          if (room?.users.find((user) => user.userid === currentUser.userid)) {
            returnObject.userIsInRoom = true;
          }

          // Find corresponding users in database
          let canFindUsers = true;
          userids.forEach((id) => {
            if (!users.find(((user) => user.userid === id))) {
              canFindUsers = false;
            }
          });
          if (canFindUsers) {
            returnObject.canFindUsers = true;
          }
        }

        if (
          !returnObject.canFindRoom || !returnObject.userIsInRoom ||
          !returnObject.canFindUsers
        ) {
          return;
        } else {
          /***********   Add to room   ***********/

          let successUpdate = true;
          userids.forEach((id) => {
            if (!room.users.find((user) => user.userid === id)) {
              // Update room
              room.users.push({
                userid: id,
                readedIndex: -1,
              });

              // Update users
              useridSocket.find(((obj) => obj.userid === id))?.userSocket.join(
                roomid,
              );

              users.find(((user) => user.userid === id)).roomids.unshift(
                roomid,
              );
            }
          });

          returnObject.room = room;
          returnObject.success = successUpdate;
        }
      })();

      returnObject.serverError = false;
    } catch (error) {
      console.log(error);
      returnObject.serverError = true;
    } finally {
      socket.emit(roomname, returnObject);
      if (returnObject.success) {
        socket.broadcast.to(roomid).emit(roomname, returnObject);
      }
    }

    // console.log(util.inspect(users, { showHidden: false, depth: null }))
    // console.log(util.inspect(chats, { showHidden: false, depth: null }))
  });
};
