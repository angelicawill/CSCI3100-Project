import React, { useState } from "react";
import "./Chat.css";
import { Avatar,IconButton } from "@material-ui/core";
// import axios from "./axios";

/*This is for chat component, on the right side of the chatroom page*/

function Chat({ messages }){

    // const [input, setInput] = useState("");
    // const sendMessage = async (e) => {
    //     e.preventDefault();

       
    //     await axios.post('/messages/new', {
            // "message": input,
            // "name":"DEMO APP",
            // "timestamp":"Just now !",
            // "received": false
    //     });

    //     setInput('');
    // }
    return(
        <div className="chat">
            <div className="chat__header">
                <Avatar /> {/*This will contain tutor's profile pic (using src={})*/}

                {/*This must be refactored later to fetch data from db*/}
                <div className="chat__headerInfo">
                    <h3>Jessica</h3>
                    <p>Mathematics Tutor</p> 
                </div>

                <div className="chat__headerRight">
                    
                </div>
            </div>

            <div className="chat__body">
                {/* {messages.map(message => (
                    <p className={`chat__message ${message.received && "chat_receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                ))} */}
               

                <p className="chat__message  chat__receiver"> {/*My message (add chat__receiver)*/}
                    <span className="chat__name">Me</span>
                    I send this message to tutor
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                <p className="chat__message"> {/*Tutor's message (without chat__receiver)*/}
                    <span className="chat__name">Tutor</span> 
                    This is tutor's message. scroll down to see more. this is a very long message hello
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                <p className="chat__message"> {/*Tutor's message*/}
                    <span className="chat__name">Tutor</span> 
                    This is tutor's message.
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                <p className="chat__message"> {/*Tutor's message*/}
                    <span className="chat__name">Tutor</span> 
                    This is tutor's message. Hello there.
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                
                
            </div>

            <div className="chat__footer">
               
                <form>
                    <input /*value={input} onChange={e => setInput(e.target.value)}*/ placeholder="Write a message.." type="text" />
                    <button /*onClick={sendMessage}*/ type="submit">Send</button>
                </form>
                
            </div>

        </div>
    )
}

export default Chat;