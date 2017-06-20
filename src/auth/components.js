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
       Sign Out <i className="fa fa-sign-out"></i>
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

export class Login extends React.Component {
  state = {
    RedirectToReferrer: false,
    Username: "",
    Password: "",
    alert: false
  }

  login = (e) => {
    e.preventDefault()
    Status.authenticateUser(this.state, (success) => {
      if(success) {
        this.setState({ RedirectToReferrer: success })
      } else {
        this.setState({ alert: true })
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { RedirectToReferrer } = this.state

    if (RedirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    const message = Status.isUserAuthenticated() ? (
      <Redirect to={from}/>
    ) : (
      <p> You are not authenticated, please enter your login and password </p>
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
