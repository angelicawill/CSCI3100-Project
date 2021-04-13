// let socekt;
const { useState, useEffect } = React
function Case() {
  const [startCase, setStartCase] = useState(null);
  const [inviteToCase, setInviteToCase] = useState(null);
  const [finishCase, setFinishCase] = useState(null);
  const [acceptCase, setAcceptCase] = useState(null);

  function startCaseButton() {
    let Input = document.querySelector("#startCaseInput");

    fetch('/case/tutor/startcase', {
      method: "POST",
      headers: {

        'Content-Type': 'application/json'
      },
      body: Input.value ? Input.value : "{}"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        setStartCase(JSON.stringify(data))
      })
  }

  function inviteToCaseButton() {
    let Input = document.querySelector("#inviteToCaseInput");

    fetch('/case/tutor/addtoinvitation', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: Input.value ? Input.value : "{}"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setInviteToCase(JSON.stringify(data))
      })
  }

  function finishCaseButton() {
    let Input = document.querySelector("#finishCaseInput");

    fetch('/case/finishcase', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: Input.value ? Input.value : "{}"
    })
      .then(res => res.json())
      .then(data => {
        setFinishCase(JSON.stringify(data))
      })
  }

  function acceptCaseButton() {
    let Input = document.querySelector("#acceptCaseInput");

    fetch('/case/acceptcase', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: Input.value ? Input.value : "{}"
    })
      .then(res => res.json())
      .then(data => {
        setAcceptCase(JSON.stringify(data))
      })
  }


  return (<>
    <br />
    <input id="startCaseInput" className="input-group" />
    <p>{startCase}</p>
    <button onClick={startCaseButton}>startCaseButton</button>
    <br />
    <input id="inviteToCaseInput" className="input-group" />
    <p>{inviteToCase}</p>
    <button onClick={inviteToCaseButton}>inviteToCaseButton</button>
    <br />
    <input id="finishCaseInput" className="input-group" />
    <p>{finishCase}</p>
    <button onClick={finishCaseButton}>finishCaseButton</button>
    <br />
    <input id="acceptCaseInput" className="input-group" />
    <p>{acceptCase}</p>
    <button onClick={acceptCaseButton}>acceptCaseButton</button>
  </>)
}

function App() {
  const [loginName, setLoginName] = useState("Not yet login");


  function Login() {
    function loginButton1() {
      console.log("clickeed")
      fetch("/login", {
        method: "POST",
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: "email",
          password: "password",
        })
      })
        .then(res => { console.log(res); return res.json() })
        .then(data => {
          console.log(data);
          // setLoginName(data.login);
        })
    }

    function loginButton2() {
      console.log("clickeed")
      fetch("/login", {
        method: "POST",
        headers: {

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: "teacher",
          password: "teacher",
        })
      })
        .then(res => { console.log(res); return res.json() })
        .then(data => {
          console.log(data);
          // setLoginName(data.login);
        })
    }
    return (<>
      <h1>{loginName}</h1>
      <button onClick={() => loginButton1()}>login Button 1</button>
      <button onClick={() => loginButton2()}>login Button 2</button>
      {/* <button onClick={() => loginButton(2)}>login Button 3</button> */}
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
