const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const socket = io()


const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

socket.emit('joinRoom', {username, room})

chatForm.addEventListener('submit', e => {
  e.preventDefault()
  socket.emit('chat message', e.target.elements.msg.value)
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

socket.on('chat message', msg => {
  renderMessage(msg)
  chatMessages.scrollTop = chatMessages.scrollHeight
})


function renderMessage({userName,msg,date}) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${userName}<span> ${date} </span></p>
						<p class="text">
            ${msg}
            </p>`

  chatMessages.appendChild(div)

}