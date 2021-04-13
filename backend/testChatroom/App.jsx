function App() {
  return (
    <div className="py-3" style={{ backgroundColor: "#feffed" }}>
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "100vh" }}
      >
        <h1>Non user</h1>
        <RequestResponse
          url="/login"
          method="POST"
          textAreaValue={{
            email: "email",
            password: "password",
          }}
        />
        <RequestResponse
          url="/nonuser/registeruser"
          method="POST"
          textAreaValue={{
            username: "user1",
            password: "user1",
          }}
        />
        <Chatroom />
        <h1>Favorite</h1>
        <RequestResponse
          url="/favorite/add"
          method="POST"
          textAreaValue={{
            hospitalId: "___",
          }}
        />
        <RequestResponse
          url="/favorite/delete"
          method="DELETE"
          textAreaValue={{
            hospitalId: "___",
          }}
        />
        <h1>Hospital</h1>
        <RequestResponse
          url="/hospital/comment"
          method="POST"
          textAreaValue={{
            hospitalId: "___",
            hospitalCommentContent: "___",
          }}
        />
        <RequestResponse
          url="/hospital/create"
          method="POST"
          textAreaValue={{
            name: "___",
            location: {
              latitude: 0,
              longitude: 0,
            },
          }}
        />
        <RequestResponse url="/hospital/getall" method="GET" textAreaValue="" />
        <RequestResponse
          url="/hospital/getone"
          method="GET"
          textAreaValue="?hospitalId=___"
        />
        <RequestResponse
          url="/hospital/update"
          method="PUT"
          textAreaValue={{
            hospitalId: "___",
            newName: "___",
            newLocation: {
              latitude: 0,
              longitude: 0,
            },
            newComments: {
              senderId: "___",
              content: "___",
            },
          }}
          notes="newName, newLocation and newComments can be not define"
        />
        <RequestResponse
          url="/hospital/refresh"
          method="PUT"
          textAreaValue=""
        />
        <RequestResponse
          url="/hospital/delete"
          method="DELETE"
          textAreaValue={{
            hospitalId: "___",
          }}
        />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
