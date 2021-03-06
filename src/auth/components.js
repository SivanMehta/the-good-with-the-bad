// adapted from here:
// https://reacttraining.com/react-router/web/example/auth-workflow

import React from 'react'
import { Route, Redirect, Link, withRouter } from 'react-router-dom'
import { Form, FormGroup, FormControl,
         Col, ControlLabel, Button,
         NavDropdown, NavItem, MenuItem, Alert } from 'react-bootstrap'
import Status from './status'

export const AuthButton = withRouter(({ history }) => (
  Status.isUserAuthenticated() ? (
    <NavItem onClick={() => {
      Status.deauthenticateUser(() => history.push('/'))
    }}>
       { Status.getUser() } | Sign Out <i className="fa fa-sign-out"></i>
    </NavItem>
  ) : (
      <NavItem title = "Account" id = "basic-nav-dropdown">
        <Link to = '/login'
          style = {{textDecoration: "none", "color": "#777"}}>
          Sign In <i className="fa fa-sign-in"></i>
        </Link>
      </NavItem>
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

export class Register extends React.Component {
  state = {
    redirect: false,
    Username: "",
    Password: "",
    alert: false
  }

  register = (e) => {
    e.preventDefault()
    Status.createUser(this.state, (success) => {
      if(success) {
        this.setState({ redirect: true })
      } else {
        this.setState({ alert: true })
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirect } = this.state

    if (redirect) {
      return (
        <Redirect to={ from }/>
      )
    }

    const message = (
      <p>
        Enter your desired username and password to register and login.
      </p>
    )

    const alert = this.state.alert ? (
      <Alert bsStyle="warning" onDismiss = {() => this.setState({alert: false})}>
        <h4>We could not register that username/combination</h4>
        <p>It is probably taken by someone else, try something else instead!</p>
      </Alert>
    ) : ""

    return(
      <div>
        { message }
        <Form horizontal onSubmit = { this.register }>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Username"
                onChange = { e => this.setState({Username: e.target.value}) } />
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
                onChange = { e => this.setState({Password: e.target.value}) } />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick = { this.login }>
                Sign Up
              </Button>
            </Col>
          </FormGroup>
        </Form>
        { alert }
      </div>
    )
  }
}

export class Login extends React.Component {
  state = {
    redirect: false,
    Username: "",
    Password: "",
    alert: false
  }

  login = (e) => {
    e.preventDefault()
    Status.authenticateUser(this.state, (success) => {
      if(success) {
        this.setState({ redirect: success })
      } else {
        this.setState({ alert: true })
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirect } = this.state

    if (redirect) {
      return (
        <Redirect to={from}/>
      )
    }

    const message = Status.isUserAuthenticated() ? (
      <Redirect to={from}/>
    ) : (
      <p>
        You are not authenticated, please enter your login and password or
        <Link to = '/register'> register</Link>.
      </p>
    )

    const alert = this.state.alert ? (
      <Alert bsStyle="danger" onDismiss = {() => this.setState({alert: false})}>
        <h4>We do not recognize that username/password combination</h4>
        <p>This is completely case-sensitive, so take care that you get everything right</p>
      </Alert>
    ) : ""

    return (
      <div>
        { message }

        <Form horizontal onSubmit = { this.login }>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Username"
                onChange = { e => this.setState({Username: e.target.value}) } />
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
                onChange = { e => this.setState({Password: e.target.value}) } />
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

        { alert }
      </div>
    )
  }
}
