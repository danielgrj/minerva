import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import './landing.css'

export default function Landing() {
  return (
    <div className="container container--landing">
      <div className="slogan">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, tempora optio aspernatur sapiente quae natus enim recusandae minima delectus ducimus! Aperiam, nisi animi tempora porro veniam facilis corrupti eaque harum!
      </div>
      <div className="identify">
        <Link to="/signup" className="signup">Signup</Link>
        <Link to="/login" className="login">Login</Link>
        <div className="social">
          <Link className="facebook"><FontAwesomeIcon icon={faFacebookF} /></Link>
          <Link className="google"><FontAwesomeIcon icon={faGoogle} /></Link>
          <a href="http://localhost:3000/api/auth/google/">Google</a>
          <a href="http://localhost:3000/api/auth/facebook/">Facebook</a>
        </div>
      </div>
    </div>
  )
}
