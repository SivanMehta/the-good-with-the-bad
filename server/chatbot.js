var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 8081 })

exports.init = (cb) => {
  wss.on('connection', (ws) => {
    var messages = []
    var i = 1

    function changeState(message = i++, from = "Chatbot") {
      messages.unshift({message: message, from: from})
      messages = messages.slice(0, 10)
      ws.send(JSON.stringify(messages))
    }

    ws.on('message', (message) => { changeState(message, "Browser") })
    setInterval(changeState, 2000)
  })

  cb()
}
