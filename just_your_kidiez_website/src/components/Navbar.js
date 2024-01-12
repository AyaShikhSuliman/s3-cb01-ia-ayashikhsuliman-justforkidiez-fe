import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import TokenManager from '../apis/TokenManager'


function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  // const [claims] = useState(TokenManager.getAccessToken());

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    console.log(props)
  }, [props.isCouch]);

  window.addEventListener('resize', showButton);
  
  return (
    <>
      <div>
        {TokenManager.getAccessToken() && props.isCouch ?
          <nav className='navbar'>
            <div className='navbar-container'>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                Just Your KidieZ
                <i className='logo' />
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/course_management'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Courses management
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/lesson_management'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Lessons management
                  </Link>
                </li>
                <li>
                  <Link
                    to='/log-in'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                  >
                    Log in
                  </Link>
                </li>

              </ul>
              {button && <Button buttonStyle='btn--outline'>LOG IN</Button>}
            </div>
          </nav>
          :
          <nav className='navbar'>
            <div className='navbar-container'>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                Just Your KidieZ
                <i className='logo' />
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/courses'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Courses
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/notification'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Notification
                  </Link>
                </li>
                <li>
                  <Link
                    to='/log-in'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                  >
                    Log in
                  </Link>
                </li>

              </ul>
              {button && <Button buttonStyle='btn--outline'>LOG IN</Button>}
            </div>
          </nav>
        }

      </div>
    </>
  );
}

export default Navbar;