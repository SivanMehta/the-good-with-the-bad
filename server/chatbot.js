var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 8081 })

exports.init = (cb) => {
  wss.on('connection', (ws) => {
    var messages = []

    ws.on('message', (message) => {
      console.log('received: %s', message)
    })

    var i = 1
    setInterval(() => {
      messages.unshift({ message: i++, from: "Chatbot" })
      messages = messages.slice(0, 10)
      ws.send(JSON.stringify(messages))
    }, 1000)
  })

  cb()
}
