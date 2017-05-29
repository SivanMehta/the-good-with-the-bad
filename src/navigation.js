import React from 'react'

import { FormGroup, FormControl, Button, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      target: ''
    }

    this.getValidationState = this.getValidationState.bind(this)
    this.updateLink = this.updateLink.bind(this)
  }

  updateLink(e) {
    this.setState({target: e.target.value})
  }

  getValidationState() {
    const length = this.state.target.length
    return this.length > 0 ? 'success' : null
  }

  render() {
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">The Good with the Bad</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <form onSubmit = {e => e.preventDefault()}>
              <FormGroup validationState={this.getValidationState()}>
                <FormControl
                type="text"
                value={this.state.target}
                placeholder=""
                onChange={this.updateLink} />

              </FormGroup>
              {' '}
              <Link to = { '/' + this.state.target }>
                <Button type = 'submit'>
                  Search
                </Button>
              </Link>
            </form>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
