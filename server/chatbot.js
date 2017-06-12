var WebSocket = require('ws')
var wss = new WebSocket.Server({ port: 8081 })

var messages = []
var i = 1

exports.init = (cb) => {
  wss.on('connection', (ws) => {

    function changeState(message = i++, from = "Chatbot") {
      messages.unshift({message: message, from: from})
      messages = messages.slice(0, 10)
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messages))
        }
      })
    }

    ws.on('message', (message) => { changeState(message, "Browser") })
    setInterval(changeState, 2000)
  })

  cb()
}
