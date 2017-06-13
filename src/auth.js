// adapted from here:
// https://reacttraining.com/react-router/web/example/auth-workflow

import React from 'react'
import {
  Route,
  Redirect,
  Link,
  withRouter
} from 'react-router-dom'
import { Button } from 'react-bootstrap'

// should actually be hitting server
// but just have a simple button for now
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

export const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
      <Button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</Button>
  ) : (
    <Link to = '/login'>
      <Button>Sign In</Button>
    </Link>
  )
))

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render = {props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        <p>You are not authenticated, click below to authenticate:</p>
        <Button onClick={this.login}>Log in</Button>
      </div>
    )
  }
}
