import socket from './api';

const savedQuote = (cb) => {
  socket.on('savedQuote', (quote) => cb(null, quote))
}

const updatedQuote = (cb) => {
  socket.on('updatedQuote', (quote) => cb(null, quote))
}

const updateQuote = (editorState, id, editorHtml) => {
  console.log(typeof editorHtml)
  socket.emit('editQuote', {editorState, editorHtml}, id)
}

export { savedQuote, updateQuote, updatedQuote }