var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 8081 })

exports.init = (cb) => {

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message);
    })
    var i = 1
    setInterval(() => {
      ws.send(JSON.stringify({
        message: i++,
        from: "Chatbot"
      }))
    }, 1000)
  })

  cb()
}
