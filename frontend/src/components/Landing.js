import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './landing.css'

export default function Landing(props) {
  useEffect(() => {
    if(localStorage.user) return props.history.push('/main')
  }, [props.history])

  return (
    <div className="container container--landing">
      <div className="slogan">
        <h1>Minerva</h1>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, tempora optio aspernatur sapiente quae natus enim recusandae minima delectus ducimus! Aperiam, nisi animi tempora porro veniam facilis corrupti eaque harum!
      </div>
      <div className="identify">
        <Link to="/signup" className="signup">Signup</Link>
        <Link to="/login" className="login">Login</Link>
      </div>
    </div>
  )
}
