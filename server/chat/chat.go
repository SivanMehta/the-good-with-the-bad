package chat

import (
  "log"
  "net/http"

  "github.com/gorilla/websocket"
  "github.com/icrowley/fake"
)

// Chat data structures
var clients = make(map[*websocket.Conn]string)
var broadcast = make(chan message)
var upgrader = websocket.Upgrader{}

type message struct {
  Message string
  From string
  Room string
}

func HandleConnections(w http.ResponseWriter, r *http.Request) {
  // Upgrade initial GET request to a websocket
  ws, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Fatal(err)
  }
  // Make sure we close the connection when the function returns
  defer ws.Close()

  // Register our new client
  clients[ws] = fake.UserName()

  for {
    var msg message
    // Read in a new message as JSON and map it to a Message object
    err := ws.ReadJSON(&msg)
    if err != nil {
      log.Printf("error: %v", err)
      delete(clients, ws)
      break
    }
    // Send the newly received message to the broadcast channel
    broadcast <- msg
  }
}

func HandleMessages() {
  for {
    // Grab the next message from the broadcast channel
    msg := <-broadcast
    // Send it out to every client that is currently connected
    for client := range clients {
      err := client.WriteJSON(msg)
      if err != nil {
        log.Printf("error: %v", err)
        client.Close()
        delete(clients, client)
      }
    }
  }
}
