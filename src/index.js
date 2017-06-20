import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import { Jumbotron, Col, Row, Image } from 'react-bootstrap'

import Argument from './argument/'
import Navigation from './navigation'
import Point from './argument/single-point'
import { PrivateRoute, Login, Register } from './auth/components'
import { About, NotFound } from './pages'

render((
  <Router history={ browserHistory }>
    <div>
      <Navigation />
      <div className = 'container'>
        <Switch>
          <PrivateRoute path = "/argument/:id/:point" component = { Point } />
          <PrivateRoute path = "/argument/:id" component = { Argument } />
          <Route path = "/login" component = { Login } />
          <Route path = "/register" component = { Register } />
          <Route exact path = "/" component = { About } />
          <Route component = { NotFound } />
        </Switch>
      </div>
    </div>
  </Router>
), document.getElementById('root'))
