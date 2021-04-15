import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar,IconButton } from "@material-ui/core";
import Input from './Input/Input';
import Messages from './Messages/Messages';
import socketIOClient from 'socket.io-client';
const ENDPOINT = '/chatroom';
// import axios from "./axios";

/*This is for chat component, on the right side of the chatroom page*/

function Chat({}){
    const [socket, setSocket] = useState(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();


        // await axios.post('/messages/new', {
        //     "message": input,
        //     "name":"DEMO APP",
        //     "timestamp":"Just now !",
        //     "received": false
        // });
        socket.emit('send message', {
            roomid: -1,
            value: message
        })

        setMessage('');
    }


    useEffect(() => {
        console.log('rendered Chat.js')
        const socket = socketIOClient(ENDPOINT);
        setSocket(socket);

        socket.on("send message", (data) => {
            console.log(data)
            setMessages(data.allContents)
        })

        socket.on('get message', (data) => {
            console.log(data);
        })
    }, []);

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

                <Messages messages={messages} />

                {/* {messages.map(message => (
                    <p className={`chat__message ${message.received && "chat_receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                ))} */}
               

                {/* <p className="chat__message  chat__receiver"> 
                    <span className="chat__name">Me</span>
                    I send this message to tutor
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                <p className="chat__message"> 
                    <span className="chat__name">Tutor</span> 
                    This is tutor's message. scroll down to see more. this is a very long message hello
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                <p className="chat__message"> 
                    <span className="chat__name">Tutor</span> 
                    This is tutor's message.
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p>
                <p className="chat__message"> 
                    <span className="chat__name">Tutor</span> 
                    This is tutor's message. Hello there.
                    <p className="chat__timestamp">{new Date().toUTCString()}</p>
                </p> */}

                
                
            </div>

            <div className="chat__footer">
               
                <form>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </form>
                
            </div>

        </div>
    )
}

export default Chat;