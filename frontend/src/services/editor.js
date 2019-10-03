import socket from './api';

const savedQuote = (cb) => {
  socket.on('savedQuote', (quote) => cb(null, quote))
}

const updateQuote = (editorState, id) => {
  console.log(id)
  socket.emit('editQuote', editorState, id)
}

export { savedQuote, updateQuote }