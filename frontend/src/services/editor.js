import io from 'socket.io-client';
const baseURL = process.env.NODE_ENV === 'production' ? 'https://atldan-minerva.herokuapp.com/' : 'http://localhost:3000/';

let socket = io.connect(baseURL, {
  query: `token=${localStorage.token}`,
  reconnection: false
});


function restartSocket() {
  socket = io.connect(baseURL, {
    query: `token=${localStorage.token}`
  });
}

const savedQuote = (cb) => {
  socket.on('savedQuote', (quote) => cb(null, quote));
};

const updatedQuote = (cb) => {
  socket.on('updatedQuote', (quote) => cb(null, quote));
};

const updateQuote = (editorState, id, editorHtml, referenceFrom) => {
  socket.emit('editQuote', {editorState, editorHtml}, id, referenceFrom)
};

function cleanConnection() {
  socket.removeAllListeners();
};

export { savedQuote, updateQuote, updatedQuote, cleanConnection, restartSocket };