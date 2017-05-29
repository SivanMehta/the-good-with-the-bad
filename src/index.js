import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { browserHistory } from 'react-router'

import Argument from './argument/'
import Navigation from './navigation'

const About = () => <p>Some really cool information</p>

render((
  <Router history={ browserHistory }>
    <div>
      <Navigation />
      <div className = 'container'>
        <Route exact path = "/" component = { About } />
        <Route path = "/:id" component = { Argument } />
      </div>
    </div>
  </Router>
), document.getElementById('root'))
