import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

import './navbar.css'

export default function Navbar() {
  const [isUsernavbarVisible, setIsUsernabarVisible] = useState(false)
  const user = JSON.parse(localStorage.user)
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <FontAwesomeIcon icon={faBars} />
          <div className="minerva"><Link to="/main">Minerva</Link></div>
        </div>
        <div className="navbar-center">
          <div className="search"><FontAwesomeIcon icon={faSearch} /><input type="text" placeholder="Search" /></div>
        </div>
        <div className="navbar-right">
          <div className="avatar" onClick={() => setIsUsernabarVisible(!isUsernavbarVisible)}>
            <img src="http://bion.com.ua/wp-content/uploads/2016/04/empty_avatar.jpg" alt="user" />
          </div>
        </div>
      </nav>
      <CSSTransitionGroup
        transitionName="navbars"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={200}
      >
        { isUsernavbarVisible ? 
          <nav className="user-sidebar">
            <h3>{user.name}</h3>
            <div className="session">
              <Link to="/profile">Profile</Link>
              <button>Logout</button>
            </div>
          </nav>
        : undefined }
      </CSSTransitionGroup>
      
    </>
    
  )
}
