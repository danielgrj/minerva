import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

import './navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FontAwesomeIcon icon={faBars} />
        <div className="minerva"><Link to="/main">Minerva</Link></div>
      </div>
      <div className="navbar-center">
        <div className="search"><FontAwesomeIcon icon={faSearch} /><input type="text" placeholder="Search"/></div>
      </div>
      <div className="navbar-right">
        <div className="avatar">
          <img src="http://bion.com.ua/wp-content/uploads/2016/04/empty_avatar.jpg" alt="user" />
        </div>
      </div>
    </nav>
  )
}
