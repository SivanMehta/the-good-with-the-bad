import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Point extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: false
    }

    this.fetchPoint = this.fetchPoint.bind(this)
    this.renderPoint = this.renderPoint.bind(this)
    this.renderSpinner = this.renderSpinner.bind(this)
    // you should be connecting to the chat server here
  }

  componentDidMount() {
    // simulate a slow server by delaying by a half second
    setTimeout(this.fetchPoint, 500)
  }

  fetchPoint() {
    fetch('/api/' + this.props.match.params.point + '/' + this.props.match.params.id)
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
  }

  renderPoint() {
    return(
      <div>
        <blockquote className="blockquote">
          <p> { this.state.data.text } </p>
          <footer className="blockquote-footer">
            { this.state.data.userName}
          </footer>
        </blockquote>
      </div>
    )
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
        <Link to = { '/argument/' + this.props.match.params.point }>
          <h1> { this.props.match.params.point } </h1>
        </Link>
        { this.state.data ? this.renderPoint() : this.renderSpinner() }
      </div>
    )
  }
}
