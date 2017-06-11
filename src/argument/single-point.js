import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Chatroom from './chatroom'

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
        <Chatroom room = { this.props.match.params } />
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
        <h1>
          <Link to = { '/argument/' + this.props.match.params.id }>
            <Glyphicon glyph='share' style = {{transform: 'scaleX(-1)'}}/>
           </Link>
           { ' ' }
           { this.props.match.params.id }
         </h1>
        { this.state.data ? this.renderPoint() : this.renderSpinner() }
      </div>
    )
  }
}
