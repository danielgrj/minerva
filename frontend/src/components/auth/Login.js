import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import AUTH_SERVICE from './../../services/auth'
import { restartSocket } from '../../services/api';

import './login.css'

export default class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    networkError: {
      className: '',
      notification: undefined
    }
  }

  componentDidMount = () => {
    if (localStorage.user) return this.props.history.push('/')
  }

  handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value

    this.setState((prevState) => {
      const { user } = prevState;

      user[key] = value;

      return { user }
    })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    try{
      const { data: { user, token } } = await AUTH_SERVICE.login(this.state.user)
      localStorage.user = JSON.stringify(user);
      localStorage.token = token;
      restartSocket(token)
      this.props.history.push('/profile');
    } catch(e) {
      if (e.response.status === 401) this.setState({ networkError: { className: 'error-animation', notification: <div className="error-network">Incorrect email or passwor</div> }})
      this.setState({ networkError: { className: 'error-animation', notification: <div className="error-network">Something went wrong on the server</div> }})
    }
  }

  render() {
    const { email, password } = this.state.user
    return (
      <div className="container container--login">
        <div className={`card card--login ${this.state.networkError.className}`}>
          <h2>Log in</h2>
          {this.state.networkError.notification}
          <form onSubmit={this.onSubmit}>
            
            <label htmlFor="email">Email</label>
            <div className="input">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <input type="text" name="email" id="email" value={email} onChange={this.handleInput} />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input">
              <FontAwesomeIcon className="icon" icon={faLock} />
              <input type="password" name="password" id="password" value={password} onChange={this.handleInput} />
            </div>
            <input type="submit" value="Login" className="submit" />
            <div className="footer">
              <p>If you don't have an account yet, you can create one <Link to="/signup">here</Link></p>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
