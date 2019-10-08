import socket from './api';

const savedQuote = (cb) => {
  socket.on('savedQuote', (quote) => cb(null, quote))
}

const updatedQuote = (cb) => {
  socket.on('updatedQuote', (quote) => cb(null, quote))
}

const updateQuote = (editorState, id, editorHtml, referenceFrom) => {
  socket.emit('editQuote', {editorState, editorHtml}, id, referenceFrom)
}

function cleanConnection() {
  socket.removeAllListeners()
}

export { savedQuote, updateQuote, updatedQuote, cleanConnection }