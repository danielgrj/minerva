import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Landing from './components/Landing'
import Editor from './components/editor/Editor'

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={App} />
          <Route exact path="/editor" component={Editor} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
