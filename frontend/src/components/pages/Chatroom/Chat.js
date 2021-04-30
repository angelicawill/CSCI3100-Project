import React, { useState } from "react";
import "./Chat.css";
import { Avatar,IconButton } from "@material-ui/core";
import teacherpic from './../TutorProfilePage/images/Jessica-Ting.png';


/*This is for chat component, on the right side of the chatroom page*/

function Chat({ messages }){


    return(
        <div className="chat">
            <div className="chat__header">
                <Avatar src={teacherpic} /> 

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
                    Hello
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                <p className="chat__message"> {/*Tutor's message (without chat__receiver)*/}
                    <span className="chat__name">Tutor</span> 
                    Hi! How can I help you?
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                <p className="chat__message chat__receiver"> 
                    <span className="chat__name">Me</span> 
                    I'd like to book a tutoring session for 5 May 10am, is it possible?
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                <p className="chat__message"> {/*Tutor's message*/}
                    <span className="chat__name">Tutor</span> 
                    Of course!
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