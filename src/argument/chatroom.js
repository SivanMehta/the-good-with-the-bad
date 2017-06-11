import React from 'react'
import { ListGroup, ListGroupItem, FormControl } from 'react-bootstrap'

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
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:8081")

    // Connection opened
    this.socket.addEventListener('open', (event) => {
      this.setState({connected: true})
      this.socket.send('Hello Server!')
    })

    // Listen for message
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)
      this.setState({history: this.state.history.concat(data)})
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
    var history = this.state.history.map((m, i) => {
      const reverse = this.state.history[this.state.history.length - i - 1]
      return (
        <ListGroupItem key = { 'message-' + i } header = {reverse.message}>
          - { reverse.from }
        </ListGroupItem>
      )
    })
    return (
      <div>
        <form onSubmit = {e => e.preventDefault()}>
          <FormControl
            type = "text"
            value = {this.state.message}
            onChange = { e => this.setState({message: e.target.value}) }
            placeholder = "Talk about it" />
        </form>
        <ListGroup>{ history }</ListGroup>
      </div>
    )
  }

  render() {
    return this.state.connected ? this.renderChat() : this.renderSpinner()
  }
}
