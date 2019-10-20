import io from 'socket.io-client';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://atldan-minerva.herokuapp.com/' : 'http://localhost:3000/'

let socket = io.connect(baseURL, {
  query: `token=${localStorage.token}`,
  reconnection: false
});


function restartSocket() {
  socket = io.connect(baseURL, {
    query: `token=${localStorage.token}`
  });
}

export { subscribeToTimer, signup, restartSocket };
export default socket