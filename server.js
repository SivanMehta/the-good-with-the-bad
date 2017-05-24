const express = require('express')
const path = require('path')
var app = express()

app.use(require('morgan')('dev'))

// static files
app.use(express.static(path.resolve(__dirname, 'public')))

// render the rest of the application with client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(8080)
