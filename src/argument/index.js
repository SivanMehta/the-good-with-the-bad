import React from 'react'
import { Col, Row } from 'react-bootstrap'

import PointList from './list-of-points'

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
    setTimeout(this.fetchArgument, 500)
  }

  fetchArgument() {
    fetch('/api/' + this.props.match.params.id)
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
  }

  renderCategories() {
    // the number of categories ideally would be something from 2 - 4
    // so we can make a pretty number of columns.
    const colSize = 12 / Object.keys(this.state.data).length

    return this.state.data ? Object.keys(this.state.data).map(cat => (
      <Col xs = { 12 } sm = { colSize } key = { cat + '-points' }>
        <PointList title = { cat }
                   arg = { this.props.match.params.id }
                   points = { this.state.data[cat] }
                   key = { cat + '-title' } />
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
        <h1> { this.props.match.params.id } </h1>
        <Row>
          {this.state.data ? this.renderCategories() : this.renderSpinner()}
        </Row>
      </div>
    )
  }
}
