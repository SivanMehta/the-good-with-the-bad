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
import Status from './status'

export const AuthButton = withRouter(({ history }) => (
  Status.isUserAuthenticated() ? (
      <Button onClick={() => {
        Status.deauthenticateUser(() => history.push('/'))
      }}>Sign out</Button>
  ) : (
    <Link to = '/login'>
      <Button>Sign In</Button>
    </Link>
  )
))

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render = {props => (
    Status.isUserAuthenticated() ? (
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

  login = (token) => {
    token = 'lol' // can get this elsewhere for now
    Status.authenticateUser(token, () => {
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
