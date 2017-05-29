import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { browserHistory } from 'react-router'

import Argument from './argument/'
import Navigation from './navigation'
import Point from './argument/single-point'

const About = () => <p>Some really cool information</p>

render((
  <Router history={ browserHistory }>
    <div>
      <Navigation />
      <div className = 'container'>
        <Switch>
          <Route path = "/argument/:id/:point" component = { Point } />
          <Route path = "/argument/:id" component = { Argument } />
          <Route exact path = "/" component = { About } />
        </Switch>
      </div>
    </div>
  </Router>
), document.getElementById('root'))
