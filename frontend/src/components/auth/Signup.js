import React, { useState, useEffect } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import validator from 'validator'

import AUTH_SERVICE from './../../services/auth'
import './signup.css'

export default function Signup (props) {
  const [isVisible, setIsVisible] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [passwordError, setPasswordError] = useState({
    className: '',
    notification: undefined
  })
  const [emailError, setEmailError] = useState({
    className: '',
    notification: undefined
  });

  useEffect(() => {
    if (localStorage.user) this.props.history.push('/profile');
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (userData.password !== userData.confirmPassword) {
      setPasswordError({
        className: 'danger',
        notification: <span className="error-form">Both passwords must be the same</span>
      })
    } else {
      setPasswordError({
        className: '',
        notification: undefined
      })
    }

    if (!validator.isEmail(userData.email)) {
      setEmailError({
        className: 'danger',
        notification: <span className="error-form">Please introduce a valid email</span>
      })
    } else {
      setEmailError({
        className: '',
        notification: undefined
      })
    }
  }, [userData])

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value
    
    setUserData({...userData, [key]: value});
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const { data: { user, token } } = await AUTH_SERVICE.signup(userData)
    localStorage.user = JSON.stringify(user);
    localStorage.token = token
    setIsVisible(false)
    setTimeout(() => props.history.push('/'), 200)
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
        <div className="container container--signup">
        <div className="card card--signup">
          <h2>Sign up</h2>
          <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <div className="input">
              <FontAwesomeIcon className="icon" icon={faUser} />
              <input type="text" name="name" id="name" value={userData.name} onChange={handleInput} />
            </div>
            <label htmlFor="email">Email {emailError.notification}</label>
            <div className={`input ${emailError.className}`}>
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <input type="text" name="email" id="email" value={userData.email} onChange={handleInput} />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input">
              <FontAwesomeIcon className="icon" icon={faLock} />
              <input type="password" name="password" id="password" value={userData.password} onChange={handleInput} />
            </div>
            <label htmlFor="password">Verify password {passwordError.notification}</label>
            <div className={`input ${passwordError.className}`}>
              <FontAwesomeIcon className="icon" icon={faLock} />
              <input type="password" name="confirmPassword" id="confirmPassword" value={userData.confirmPassword} onChange={handleInput} />
            </div>
            <input type="submit" className="submit" value="Sign up" />
          </form>
        </div>
      </div>
      : undefined }
    </CSSTransitionGroup>
  )
}