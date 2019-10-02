import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import validator from 'validator'
import AUTH_SERVICE from './../../services/auth'
import './signup.css'

export default class Signup extends Component {
  state = {
    user: {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    },
    passwordError: {
      className: '',
      notification: undefined
    },
    emailError: {
      className: '',
      notification: undefined
    },
  }

  componentDidMount = () => {
    if (localStorage.user) this.props.history.push('/profile')
  }

  handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value

    this.setState(prevState => {
      const { user, passwordError, emailError } = prevState;
      user[key] = value

      if(user.password !== user.confirmPassword) {
        passwordError.className = 'danger'
        passwordError.notification = <span className="error-form">Both passwords must be the same</span>
      } else {
        passwordError.className = ''
        passwordError.notification = undefined
      }

      if(!validator.isEmail(user.email)) {
        emailError.className = 'danger'
        emailError.notification = <span className="error-form">Please introduce a valid email</span>
      } else {
        emailError.className = ''
        emailError.notification = undefined
      }

      return { user, passwordError, emailError }
    })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { data: { user, token } } = await AUTH_SERVICE.signup(this.state.user)
    localStorage.user = JSON.stringify(user);
    localStorage.token = token
    this.props.history.push('/')
  }

  render() {
    const { email, password, name, confirmPassword } = this.state.user
    const {passwordError, emailError} = this.state
    return (
      <div className="container container--signup">
        <div className="card card--signup">
          <h2>Sign up</h2>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="name">Name</label>
            <div className="input">
              <FontAwesomeIcon className="icon" icon={faUser}/>
              <input type="text" name="name" id="name" value={name} onChange={this.handleInput} />
            </div>
            <label htmlFor="email">Email {emailError.notification}</label>
            <div className={`input ${emailError.className}`}>
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <input type="text" name="email" id="email" value={email} onChange={this.handleInput} />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input">
              <FontAwesomeIcon className="icon" icon={faLock} />
              <input type="password" name="password" id="password" value={password} onChange={this.handleInput} />
            </div>
            <label htmlFor="password">Verify password {passwordError.notification}</label>
            <div className={`input ${passwordError.className}`}>
              <FontAwesomeIcon className="icon" icon={faLock} />
              <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={this.handleInput} />
            </div>
            <input type="submit" className="submit" value="Sign up"/>     
          </form>
        </div>
      </div>
    )
  }
}
