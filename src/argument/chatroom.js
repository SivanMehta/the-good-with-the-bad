import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      connected: false,
      messages: []
    }

    this.renderSpinner = this.renderSpinner.bind(this)
    this.renderChat = this.renderChat.bind(this)
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8081")

    // Connection opened
    this.socket.addEventListener('open', (event) => {
      this.setState({connected: true})
      this.socket.send('Hello Server!')
    })

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
      this.setState({messages: this.state.messages.concat(event.data)})
    })
  }

  renderSpinner() {
    return (
      <p className = 'text-center'>
        Connecting to chat... <i className="fa fa-refresh fa-spin fa-fw"></i>
      </p>
    )
  }

  renderChat() {
    var messages = this.state.messages.map((m, i) => {
      return (
        <ListGroupItem key = { 'message-' + i }>
          { this.state.messages[this.state.messages.length - i - 1] }
        </ListGroupItem>
      )
    })
    return <ListGroup>{ messages }</ListGroup>
  }

  render() {
    return this.state.connected ? this.renderChat() : this.renderSpinner()
  }
}
