import io from 'socket.io-client';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://atldan-minerva.herokuapp.com/' : 'http://localhost:3000/'

let socket = io.connect(baseURL, {
  query: `token=${localStorage.token}`
});


function restartSocket() {
  socket = io.connect(baseURL, {
    query: `token=${localStorage.token}`
  });
}

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
} 

function signup(){
  socket.emit('signup', { }, (error, user, token) => {
    if(error) console.log(error)

    localStorage.user = JSON.stringify(user)
    localStorage.token = `Bearer ${token}`
  })
}



export { subscribeToTimer, signup, restartSocket };
export default socket