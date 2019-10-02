import React, { Component } from 'react'
import { subscribeToTimer, signup } from './services/api';
import AUTH_SERVICE from './services/auth';
import Editor from './components/editor/Editor';

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
        <Editor />
        <button onClick={signup}>Signup</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}
