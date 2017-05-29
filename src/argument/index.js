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
  }

  fetchArgument() {
    // would ideally hit the server, but we're not there yet
    // the number of categories ideally would be something from 2 - 4
    // so we can make a pretty number of columns.
    //
    // We also could potentially have more columns like
    // Alternatives, (Worthwhile)ness, etc...
    this.setState({data: ['Pros', 'Cons'] })

    this.renderCategories()
  }

  componentDidMount() {
    this.fetchArgument()
  }

  renderCategories() {
    const colSize = 12 / this.state.data.length
    return this.state.data.map(cat => (
      <Col xs = { 12 } sm = { colSize } key = { cat + '-points' }>
        <Panel header = { cat } key = { cat + '-title' }>
          Panel content
        </Panel>
      </Col>
    ))
  }

  render() {
    return (
      <div>
        <h1> { this.props.match.params.id} </h1>
        <Row>
          { this.renderCategories() }
        </Row>
      </div>
    )
  }
}
