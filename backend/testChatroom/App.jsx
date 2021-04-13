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
            email: "student",
            password: "student",
          }}
        />
        <Chatroom />
        <h1>Case</h1>
        <RequestResponse
          url="/case/tutor/startcase"
          method="POST"
          textAreaValue={""}
        />
        <RequestResponse
          url="/case/tutor/invitetocase"
          method="PUT"
          textAreaValue={{
            studentidList: [],
            caseid: 0
          }}
        />
        <RequestResponse
          url="/case/tutor/finishcase"
          method="PUT"
          textAreaValue={{
            caseid: 0
          }}
        />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
