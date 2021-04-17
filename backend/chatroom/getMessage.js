module.exports = ({
    socket,
    rooms
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
            let room = rooms.find((room) => room.roomid == roomid);
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