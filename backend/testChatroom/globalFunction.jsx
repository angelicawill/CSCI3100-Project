const { useState, useEffect } = React;

function RequestResponse({ url, method, textAreaValue, notes }) {
  let id = url.replace(/\//g, "special");
  useEffect(() => {
    let mainDiv = document.querySelector(`#${id}`);
    let textArea = mainDiv.querySelector("textarea");
    let button = mainDiv.querySelector("button");
    let pre = mainDiv.querySelector("pre");

    button.addEventListener("click", () => {
      sendRequest();
    });

    textArea.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "Enter") {
        button.click();
      }
    });

    textArea.value =
      typeof textAreaValue == "string"
        ? textAreaValue
        : JSON.stringify(textAreaValue);

    function sendRequest() {
      let content = textArea.value;
      let requestUrl = url;
      let options = {
        method: method,
      };

      if (method == "POST" || method == "PUT" || method == "DELETE") {
        options.headers = {
          "Content-Type": "application/json",
        };
        if (content) {
          try {
            JSON.parse(content);
            options.body = content;
          } catch (e) {
            console.log(e);
          }
        }
      } else if (method == "GET") {
        requestUrl += content;
      }
      console.log(options);
      fetch(requestUrl, options)
        .then((res) => res.json())
        .then((data) => {
          pre.textContent = JSON.stringify(data, null, 2);
        });
    }
  }, []);
  return (
    <div
      id={id}
      className="container py-3"
      style={{
        backgroundColor: "#fafad2",
        borderRadius: "7px",
        marginBottom: "10px",
      }}
    >
      {notes !== undefined && <p>{notes}</p>}
      <div
        className="row"
        style={{
          marginBottom: "10px",
        }}
      >
        <div className="col-md-6" style={{ height: "200px" }}>
          <textarea
            className="form-control"
            style={{ height: "100%", width: "100%", resize: "none" }}
          ></textarea>
        </div>
        <div className="col-md-6" style={{ height: "200px" }}>
          {/* <div className="hidebefore"></div> */}
          <pre style={{ height: "100%", overflow: "auto" }}></pre>
        </div>
      </div>
      <button className="btn">{url}</button>
    </div>
  );
}

function ChatBlock({ roomname, state, textAreaValue, notes, so }) {
  let id = roomname.replace(/\s/g, "special");
  let textArea;

  useEffect(() => {
    let mainDiv = document.querySelector(`#${id}`);
    textArea = mainDiv.querySelector("textarea");
    let button = mainDiv.querySelector("button");
    let pre = mainDiv.querySelector("pre");

    button.addEventListener('click', () => {
      let content = textArea.value;
      console.log("send request");
      so.emit(roomname, JSON.parse(content));
    })

    textArea.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key === "Enter") {
        button.click();
      }
    });
    
    textArea.value =
    typeof textAreaValue == "string"
    ? textAreaValue
    : JSON.stringify(textAreaValue);
  }, [so]);
  

  return (
    <div
      id={id}
      className="container py-3"
      style={{
        backgroundColor: "#fafad2",
        borderRadius: "7px",
        marginBottom: "10px",
      }}
    >
      {notes !== undefined && <p>{notes}</p>}
      <div
        className="row"
        style={{
          marginBottom: "10px",
        }}
      >
        <div className="col-md-6" style={{ height: "200px" }}>
          <textarea
            className="form-control"
            style={{ height: "100%", width: "100%", resize: "none" }}
          ></textarea>
        </div>
        <div className="col-md-6" style={{ height: "200px" }}>
          {/* <div className="hidebefore"></div> */}
          <pre style={{ height: "100%", overflow: "auto" }}>{state}</pre>
        </div>
      </div>
      <button className="btn">
        {roomname}
      </button>
    </div>
  );
}
