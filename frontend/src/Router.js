import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './components/App'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Landing from './components/Landing'
import Editor from './components/editor/Editor'
import Layout from './components/overview/Layout'
import Quote from './components/editor/Quote'

export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/main" component={Layout} />
          {/* <Route exact path="/main/addQuote" component={Quote} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={App} />
          <Route exact path="/editor" component={Editor} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
