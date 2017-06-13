// adapted from here:
// https://reacttraining.com/react-router/web/example/auth-workflow

import React from 'react'
import { Route, Redirect, Link, withRouter } from 'react-router-dom'
import { Form, FormGroup, FormControl,
  Col, ControlLabel, Button } from 'react-bootstrap'
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
    redirectToReferrer: false,
    username: "",
    password: ""
  }

  login = (e) => {
    e.preventDefault()
    Status.authenticateUser(this.state, () => {
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
        <p>You are not authenticated, enter your password below to authenticate:</p>

        <Form horizontal onSubmit = { this.login }>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Username"
                onChange = { e => this.setState({username: e.target.value}) } />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Password"
                onChange = { e => this.setState({password: e.target.value}) } />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick = { this.login }>
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
