import React from 'react'
import ReactDOM from 'react-dom'

export default class Argument extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h3>
        ID: { this.props.match.params.id}
      </h3>
    )
  }
}
