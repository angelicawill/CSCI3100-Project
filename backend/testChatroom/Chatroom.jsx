function Chatroom() {
  const [connect, setConnect] = useState(null);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  null;
  const [createroomText, setcreateroomText] = useState(null);
  const [sendmessageText, setsendmessageText] = useState(null);
  const [getroomsText, setgetroomsText] = useState(null);
  const [readmessageText, setreadmessageText] = useState(null);
  function connectButton() {
    let so = io("/chatroom");

    so.on("connect", (data) => {
      if (so.connected) {
        setConnect("true");
        setError(null);
      }
    });

    so.on("add to room", (data) => {
      console.log("received data from add to room in chat room");
      setaddtoroomText(JSON.stringify(data));
    });
    so.on("create room", (data) => {
      console.log("received data from creat room in chat room");
      setcreateroomText(JSON.stringify(data));
    });
    so.on("send message", (data) => {
      console.log("received data from send message in chat room");
      setsendmessageText(JSON.stringify(data));
    });
    so.on("get rooms", (data) => {
      console.log("received data from get rooms in chat room");
      setgetroomsText(JSON.stringify(data));
    });
    so.on("read message", (data) => {
      console.log("received data from read message in chat room");
      setreadmessageText(JSON.stringify(data));
    });
    so.on("connect_error", (err) => {
      setError(JSON.stringify(err));
      setConnect(null);
    });
    console.log(so);
    setSocket(so);
  }

  return (
    <div>
      <h1>Chatroom</h1>
      <h1>Connect</h1>
      <p>{connect}</p>
      <h1>Error</h1>
      <p>{error}</p>
      <button onClick={connectButton}>Connect button</button>
      <ChatBlock
        roomname="create room"
        state={createroomText}
        textAreaValue={{
          username: "teacher",
        }}
        so={socket}
      />
      <ChatBlock
        roomname="send message"
        state={sendmessageText}
        textAreaValue={{
            roomid: 1,
            value: "___"
        }}
        so={socket}
      />
    </div>
  );
}
