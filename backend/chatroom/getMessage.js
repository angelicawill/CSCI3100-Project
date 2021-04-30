module.exports = ({
    socket,
    rooms,
    currentUser
}) => {
    let eventName = 'get message';
    socket.on(eventName, ({
        roomid
    }) => {
        let returnObject = {
            roomid: null,
            allContents: [],
            success: false,
            serverError: true,
        }

        try {
            /***********   check input syntax valid   ***********/
            if (typeof roomid != "number") {
                return;
            }
            let room = rooms.find((room) => room.roomid == roomid);

            /***********   check room exist   ***********/
            if (!room) {
                return;
            }

            /***********   check user is in room   ***********/
            if (!room.usernames.find(username => username == currentUser.username)) {
                return;
            }
            
            returnObject.roomid = roomid;
            returnObject.allContents = room.contents;

            returnObject.success = true;
            returnObject.serverError = false;
        } catch (error) {
            console.log(error);
            returnObject.serverError = true;
        } finally {
            socket.emit(eventName, returnObject);
        }
    })
}