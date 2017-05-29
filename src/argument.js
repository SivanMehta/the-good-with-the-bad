import React from 'react'
import { Col, Row, Panel } from 'react-bootstrap'

export default class Argument extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1> { this.props.match.params.id} </h1>
        <Row>
          <Col xs={12} sm={6}>
            <Panel header='Pros'>
              Panel content
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel header='Cons'>
              Panel content
            </Panel>
          </Col>
        </Row>
      </div>
    )
  }
}
