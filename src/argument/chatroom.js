import React from 'react'

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      connected: false
    }

    this.renderSpinner = this.renderSpinner.bind(this)
  }

  renderSpinner() {
    return (
      <p className = 'text-center'>
        Connect to chat... <i className="fa fa-refresh fa-spin fa-fw"></i>
      </p>
    )
  }

  render() {
    return this.state.connected ? this.renderChat() : this.renderSpinner()
  }
}
