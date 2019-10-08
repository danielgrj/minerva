import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import AUTH_SERVICE from './../../services/auth'
import { restartSocket } from '../../services/api';

import './login.css'

export default function Login (props) {
  const [ isVisible, setIsVisible ] = useState(false)
  const [ userData, setUserData ] = useState({
    email: '',
    password: ''
  })
  const [networkError, setNetworkError] = useState({
    className: '',
    notification: undefined
  })

  useEffect(() => {
    setIsVisible(true)
    if (localStorage.user) props.history.push('/main')
  }, [])

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value

    setUserData({...userData, [key]: value})
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data: { user, token } } = await AUTH_SERVICE.login(userData)
      localStorage.user = JSON.stringify(user);
      localStorage.token = token;
      restartSocket(token)
      props.history.push('/main');
    } catch (e) {
      console.log(e)
      if (e.response.status === 401) setNetworkError({ networkError: { className: 'error-animation', notification: <div className="error-network">Incorrect email or passwor</div> } })
      setNetworkError({ networkError: { className: 'error-animation', notification: <div className="error-network">Something went wrong on the server</div> } })
    }
  }

  return (
    <CSSTransitionGroup
      transitionName="collection-overview"
      transitionAppearTimeout={600}
      transitionEnterTimeout={250}
      transitionLeaveTimeout={200}
      component="div"
    >
      { isVisible ? 
        <div className="container container--login">
          <div className={`card card--login ${networkError.className}`}>
            <h2>Log in</h2>
            {networkError.notification}
            <form onSubmit={onSubmit}>

              <label htmlFor="email">Email</label>
              <div className="input">
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
                <input type="text" name="email" id="email" value={userData.email} onChange={handleInput} />
              </div>
              <label htmlFor="password">Password</label>
              <div className="input">
                <FontAwesomeIcon className="icon" icon={faLock} />
                <input type="password" name="password" id="password" value={userData.password} onChange={handleInput} />
              </div>
              <input type="submit" value="Login" className="submit" />
              <div className="footer">
                <p>If you don't have an account yet, you can create one <Link to="/signup">here</Link></p>
              </div>
            </form>
          </div>
        </div>
      : undefined }
    </CSSTransitionGroup>
    
  )
}