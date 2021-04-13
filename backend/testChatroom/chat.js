function Chat() {
    const [connect, setConnect] = useState(null);
    const [socket, setSocket] = useState(null);
    const [addtoroomText, setaddtoroomText] = useState(null);
    const [createroomText, setcreateroomText] = useState(null);
    const [sendmessageText, setsendmessageText] = useState(null);
    const [getroomsText, setgetroomsText] = useState(null);
    const [readmessageText, setreadmessageText] = useState(null);
    const [error, setError] = useState(null);
    function connectButton() {
        let so = io('/chatroom');

        so.on('connect', (data) => {
            if (so.connected) {
                setConnect("true");
                setError(null);
            }
        })

        so.on('add to room', (data) => {
            console.log("received data from add to room in chat room")
            setaddtoroomText(JSON.stringify(data))
        })
        so.on('create room', (data) => {
            console.log("received data from creat room in chat room")
            setcreateroomText(JSON.stringify(data))
        })
        so.on('send message', (data) => {
            console.log("received data from send message in chat room")
            setsendmessageText(JSON.stringify(data))
        })
        so.on('get rooms', (data) => {
            console.log("received data from get rooms in chat room")
            setgetroomsText(JSON.stringify(data))
        })
        so.on('read message', (data) => {
            console.log("received data from read message in chat room")
            setreadmessageText(JSON.stringify(data))
        })
        so.on("connect_error", (err) => {
            setError(JSON.stringify(err));
            setConnect(null);
        });

        setSocket(so);
    }

    function addRoomButton() {
        let addtoroomInput = document.querySelector("#addtoroomInput");
        let data = JSON.parse(addtoroomInput.value ? addtoroomInput.value : "{}");
        socket.emit('add to room', data);
    }
    function createRoomButton() {
        let createroomInput = document.querySelector("#createroomInput");
        let data = JSON.parse(createroomInput.value ? createroomInput.value : "{}");
        socket.emit('create room', data);
    }
    function sendMessageButton() {
        let sendmessageInput = document.querySelector("#sendmessageInput");
        let data = JSON.parse(sendmessageInput.value ? sendmessageInput.value : "{}");
        console.log(data);
        socket.emit('send message', data);
    }
    function getRoomButton() {
        let getroomsInput = document.querySelector("#getroomsInput");
        let data = JSON.parse(getroomsInput.value ? getroomsInput.value : "{}");
        socket.emit('get rooms', data);
    }
    function readMessageButton() {
        let readmessageInput = document.querySelector("#readmessageInput");
        let data = JSON.parse(readmessageInput.value ? readmessageInput.value : "{}");
        socket.emit('read message', data);
    }

    

    return (<>
        <h1>Connect</h1>
        <p>{connect}</p>
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={connectButton}>Connect button</button>
        {/* <br />
        <input id="addtoroomInput" className="input-group" />
        <p>{addtoroomText}</p>
        <button onClick={addRoomButton} > addtoroombutton</button> */}
        <br />
        <input id="createroomInput" className="input-group" />
        <p>{createroomText}</p>
        <button onClick={createRoomButton} > createroombutton</button>
        <br />
        <input id="sendmessageInput" className="input-group" />
        <p>{sendmessageText}</p>
        <button onClick={sendMessageButton} > sendmessagebutton</button>
        {/* <br />
        <input id="getroomsInput" className="input-group" />
        <p>{getroomsText}</p>
        <button onClick={getRoomButton} > getroomsbutton</button>
        <br />
        <input id="readmessageInput" className="input-group" />
        <p>{readmessageText}</p>
        <button onClick={readMessageButton} > readmessagebutton</button> */}
        <br />
    </>)
}