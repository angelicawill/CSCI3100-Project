import React from 'react';
import  "./Sidebar.css";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from './SidebarChat';

/*This is for sidebar component, on the left side of the chatroom page*/

function Sidebar(){
    return(
        <div className='sidebar'>
            <div className="sidebar__header">
                
                <div className="sidebar__headerRight">
                    <h1>Messages</h1>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search message" type="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar;
