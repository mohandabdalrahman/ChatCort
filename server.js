const express = require('express')
const path = require('path')
const http = require('http')
const app = express()
const formatMessages = require('./utils/messages')
app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
const io = require('socket.io')(server);

const botName = 'ChatCort Bot'

io.on('connection', socket => {

  socket.on('joinRoom', ({ username, room }) => {

    // Welcome current user
    socket.emit('chat message', formatMessages(botName, 'Welcome to ChatCord!'))

    socket.broadcast.emit('chat message', formatMessages(botName, 'user has joined the chat'))
  })

  socket.on('chat message', msg => {
    socket.emit('chat message', formatMessages('User', msg))
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`App listening on port: ${PORT}`))