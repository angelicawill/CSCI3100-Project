import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from "./../logo.svg";
import MenuIcon from '@material-ui/icons/Menu';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';



function Header() {
    return (
        <div className='header'>
            <Link to='/'>
                <Logo
                    className="header__icon"
                    alt=""
                />
            </Link>
           
            <div className='header__center'>
                <input type="text" />
                <SearchIcon />
            </div>

            <div className='header__right'>  
                <button className='postACase'>
                    Post a job
                </button>           
                <IconButton>
                    <ForumRoundedIcon style={{fill: "black"}}/>
                </IconButton>               

                <button className='profile'>
                  <Avatar className='profilepic' style={{ height: '30px', width: '30px' }} />  
                  <MenuIcon fontSize="small" style={{fill: "black"}}/>
                </button>
                
            </div>
        </div>
    )
}

export default Header