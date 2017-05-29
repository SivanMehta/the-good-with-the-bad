import React from 'react'
import { Col, Row, Panel } from 'react-bootstrap'

export default class Argument extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: false
    }

    this.renderCategories = this.renderCategories.bind(this)
    this.fetchArgument = this.fetchArgument.bind(this)
    this.renderSpinner = this.renderSpinner.bind(this)
  }

  componentDidMount() {
    // simulate a slow server by delaying by a half second
    setTimeout(this.fetchArgument, 1000)
  }

  fetchArgument() {
    // would ideally hit the server and change the state
    // accordingly, but we're not there yet
    // We also could potentially have more columns like
    // Alternatives, (Worthwhile)ness, etc...
    this.setState({ data: ['Pros', 'Cons'] })

  }

  renderCategories() {
    // the number of categories ideally would be something from 2 - 4
    // so we can make a pretty number of columns.

    const colSize = 12 / this.state.data.length
    return this.state.data ? this.state.data.map(cat => (
      <Col xs = { 12 } sm = { colSize } key = { cat + '-points' }>
        <Panel header = { cat } key = { cat + '-title' }>
          Panel content
        </Panel>
      </Col>
    )) : ''
  }

  renderSpinner() {

    return (
      <p className = 'text-center'>
        Fetching data... <i className="fa fa-refresh fa-spin fa-fw"></i>
      </p>
    )
  }

  render() {
    return (
      <div>
        <h1> { this.props.match.params.id} </h1>
        <Row>
          {this.state.data ? this.renderCategories() : this.renderSpinner()}
        </Row>
      </div>
    )
  }
}
