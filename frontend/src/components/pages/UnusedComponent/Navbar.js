import React, { useState, useEffect } from 'react';
import { Button } from '../../Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
// import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import {ReactComponent as Logo} from './logo.svg';


function Navbar() {
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
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/find-tutor' className='navbar-logo' onClick={closeMobileMenu}>
              <Logo className='navbar-icon' />           
            </Link>
            {/* <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div> */}
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>              
              {/* <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
              </li> */}
              <li className='nav-btn'>
                {button ? (
                  <Link to='/login' className='btn-link'>
                    <Button buttonStyle='btn--outline'>Log In</Button>
                  </Link>
                ) : (
                  <Link to='/sign-up' className='btn-link'>
                    <Button
                      buttonStyle='btn--outline'
                      buttonSize='btn--mobile'
                      onClick={closeMobileMenu}
                    >
                      Register
                    </Button>
                  </Link>
                )}
              </li>
              <li className='nav-btn'>
                {button ? (
                  <Link to='/sign-up' className='btn-link'>
                    <Button buttonStyle='btn--primary'>Register</Button>
                  </Link>
                ) : (
                  <Link to='/sign-up' className='btn-link'>
                    <Button
                      buttonStyle='btn--primary'
                      buttonSize='btn--mobile'
                      onClick={closeMobileMenu}
                    >
                      Register
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
