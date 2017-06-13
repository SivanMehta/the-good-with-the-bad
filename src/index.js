import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { browserHistory } from 'react-router'

import Argument from './argument/'
import Navigation from './navigation'
import Point from './argument/single-point'
import { Login, PrivateRoute } from './auth/components'

const About = () => <p>Some really cool information</p>

const Status = ({ code, children }) => (
 <Route render={({ staticContext }) => {
   if (staticContext)
     staticContext.status = code
   return children
 }}/>
)

const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>¯\_(ツ)_/¯</h1>
      <p>I have <a href = "https://youtu.be/qPefOfu2TIU?t=9">no idea</a> what this is.</p>
    </div>
  </Status>
)

render((
  <Router history={ browserHistory }>
    <div>
      <Navigation />
      <div className = 'container'>
        <Switch>
          <PrivateRoute path = "/argument/:id/:point" component = { Point } />
          <PrivateRoute path = "/argument/:id" component = { Argument } />
          <Route path = "/login" component = { Login } />
          <Route exact path = "/" component = { About } />
          <Route component = { NotFound } />
        </Switch>
      </div>
    </div>
  </Router>
), document.getElementById('root'))
