// let socekt;
const { useState } = React
function Case() {
  const [startCase, setStartCase] = useState("");
  function startCaseButton() {
    fetch('/case/startcase', {
      method: "POST",
      headers: {

        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
      .then(res => res.json())
      .then(data => {
        setStartCase(JSON.stringify(data))
      })
  }

  const [inviteToCase, setInviteToCase] = useState("");
  function inviteToCaseButton() {
    fetch('/case/invitetocase', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        studentList: [1],
        caseid: 111
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setInviteToCase(JSON.stringify(data))
      })
  }

  const [finishCase, setFinishCase] = useState("");
  function finishCaseButton() {
    fetch('/case/finishcase', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        caseid: 111
      })
    })
      .then(res => res.json())
      .then(data => {
        setFinishCase(JSON.stringify(data))
      })
  }

  const [acceptCase, setAcceptCase] = useState("");
  function acceptCaseButton() {
    fetch('/case/acceptcase', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        caseid: 111
      })
    })
      .then(res => res.json())
      .then(data => {
        setAcceptCase(JSON.stringify(data))
      })
  }

  return (<>
    <p>{startCase}</p>
    <button onClick={startCaseButton}>startCaseButton</button>
    <p>{inviteToCase}</p>
    <button onClick={inviteToCaseButton}>inviteToCaseButton</button>
    <p>{finishCase}</p>
    <button onClick={finishCaseButton}>finishCaseButton</button>
    <p>{acceptCase}</p>
    <button onClick={acceptCaseButton}>acceptCaseButton</button>
  </>)
}

function App() {
  const [loginName, setLoginName] = useState("Not yet login");


  function Login() {
    function loginButton(i) {
      console.log("clickeed")
      fetch("/login", {
        method: "POST",
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: `name${i + 1}@gmail.com`,
          password: `name${i + 1}`,
        })
      })
        .then(res => { console.log(res); return res.json() })
        .then(data => {
          console.log("wow");
          setLoginName(data.login);
        })
    }
    return (<>
      <h1>{loginName}</h1>
      <button onClick={() => loginButton(0)}>login Button 1</button>
      <button onClick={() => loginButton(1)}>login Button 2</button>
      <button onClick={() => loginButton(2)}>login Button 3</button>
    </>)
  }
  return (
    <>
      <Login />
      <Case />
      <Chat />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
