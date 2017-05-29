import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default class Point extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }
    // you should be connecting to the chat server here
  }


  render() {
    return(
      <h3> { this.props.match.params.point } </h3>
    )
  }
}
