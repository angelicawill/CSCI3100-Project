import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { BiBell } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import {ReactComponent as Logo} from './logo.svg';
import userProfilePic from './images/jane-chan-profile-pic.png';
import SearchIcon from "@material-ui/icons/Search";

const userInfo = {
    userName: "Jane Chan",
    userType: "Student",
    userProfilePic: <img src={userProfilePic} alt="userProfilePic" />,
};

function Header() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);
        return (
            window.removeEventListener('resize', showButton)
        )
    }, []);


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='header'>
                    <div className='header-container container'>
                        <Link to='/' className='header-logo' onClick={closeMobileMenu}>
                            <Logo className='header-icon' />
                        </Link>

                        {/* <form action="/" method="get">
                            <div className="search-bar">
                                <input type="text" placeholder="Find Tutor" />
                            </div>
                        </form> */}

                        <div className='header__center'>
                            <button className='searchForTutor'>
                                <p>Start your tutor search</p>
                                <button component>
                                    <SearchIcon style={{ color: "white",  fontSize: 17 }}/>
                                </button>
                            </button>                                           
                        </div>
                        <Link to='/user-information' className='user-profile-link' style={{ textDecoration: 'none' }} >
                            <div className="profile-box">
                                <Link to='/notification' className='notification-link'>
                                    <IconContext.Provider value={{className:"notification-bell",  style: {fontSize: '30px', color: "rgb(130,130,130)"}}}>
                                        <BiBell/>
                                    </IconContext.Provider>
                                </Link>
                                <h2 className="userName">{userInfo.userName}</h2>
                                <h2 className="userType">{userInfo.userType}</h2>
                                <img src={userProfilePic} alt="User Profile Pic" className="userProfilePic"/>
                            </div>
                        </Link>
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Header;
