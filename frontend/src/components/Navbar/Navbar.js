import React from 'react'
import './Navbar.css'
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from "./../logo.svg";
import MenuIcon from '@material-ui/icons/Menu';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import userProfilePic from './../images/jane-chan-profile-pic.png';


const userInfo = {
    userName: "Jane Chan",
    userType: "Student",
    // userProfilePic: <img src={userProfilePic} alt="userProfilePic" />,
};


function Header() {
    return (
        <div className='header'>
            <Link to='/find-tutor'>
                <Logo
                    className="header__icon"
                    alt=""
                />
            </Link>
           
            <div className='header__center'>
                <Link to="/find-tutor" className='search-link'>
                    <button className='searchForTutor'>
                        <p>Start your tutor search</p>
                        <button component>
                            <SearchIcon style={{ color: "white",  fontSize: 17 }}/>
                        </button>
                    </button> 
                </Link>              
                
            </div>

            <div className='header__right'>  
                {/* <button className='postACase'>
                    Post a job
                </button>            */}

                <Link to="/chatroom">   
                    <IconButton className='chatroom'>
                        <ForumRoundedIcon style={{fill: "black"}}/>
                    </IconButton> 
                </Link>              

                <Link to="/user-information">
                    <button className='profile'>
                        <Avatar /*src={userProfilePic}*/ alt="User Profile Pic" className="userProfilePic"className='profilepic' style={{ height: '30px', width: '30px' }} />  
                        <MenuIcon fontSize="small" style={{fill: "black"}}/>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Header