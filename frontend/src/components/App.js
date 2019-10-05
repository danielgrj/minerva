import React, { Component } from 'react'
import { subscribeToTimer, signup } from '../services/api';
import AUTH_SERVICE from '../services/auth';
import Editor from './editor/Editor';
import Quote from './editor/Quote';

export default class App extends Component {
  state = {
    timestamp: 'Not defined'
  }

  componentDidMount = () => {
    subscribeToTimer((err, timestamp) => {
      this.setState({timestamp})
    })
  }

  logout = async () => {
    await AUTH_SERVICE.logout()
    delete localStorage.user
    delete localStorage.token
  }

  render() {
    return (
      <div>
        <Quote />
        <button onClick={signup}>Signup</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}
