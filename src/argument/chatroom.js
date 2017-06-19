import React from 'react'
import { ListGroup, ListGroupItem,
         FormControl, Button } from 'react-bootstrap'

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      connected: false,
      history: [],
      message: ""
    }

    this.renderSpinner = this.renderSpinner.bind(this)
    this.renderChat = this.renderChat.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://' + window.location.host + '/ws')

    // Connection opened
    this.socket.addEventListener('open', (event) => {
      this.setState({connected: true})
    })

    // Listen for message
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)
      this.setState({ history: this.state.history.concat(data) })
    })
  }

  renderSpinner() {
    return (
      <p className = 'text-center'>
        Connecting to chat... <i className="fa fa-refresh fa-spin fa-fw"></i>
      </p>
    )
  }

  sendMessage(e) {
    e.preventDefault()
    if (this.state.message.length > 0) {
      this.socket.send(JSON.stringify({
          Message: this.state.message,
          From: "browser",
          Room: this.props.room
        }))
      this.setState({message: ""})
    }
  }

  renderChat() {
    var history = this.state.history.map((m, i) => {
      const x = this.state.history[this.state.history.length - i - 1]
      return (
        <ListGroupItem key = { 'message-' + i } header = {x.Message}>
          - { x.From }
        </ListGroupItem>
      )
    })
    return (
      <div>
        <form onSubmit = { this.sendMessage }>
          <FormControl
            type = "text"
            value = {this.state.message}
            onChange = { e => this.setState({message: e.target.value}) }
            placeholder = "Talk about it" />
          <Button type = 'submit'>
            Send
          </Button>
        </form>
        <ListGroup>{ history }</ListGroup>
      </div>
    )
  }

  render() {
    return this.state.connected ? this.renderChat() : this.renderSpinner()
  }
}
