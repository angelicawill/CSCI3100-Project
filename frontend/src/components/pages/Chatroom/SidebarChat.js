import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

/*This is mini components of chats on the sidebar, on the left side of the page*/

function SidebarChat(){
    return <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
            <h2>Jessica</h2>
            <p>...</p>
        </div>
    </div>;
}

export default SidebarChat;