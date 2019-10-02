import io from 'socket.io-client';

let socket = io.connect('http://localhost:3000', {
  query: `token=${localStorage.token}`
});


function restartSocket() {
  socket = io.connect('http://localhost:3000', {
    query: `token=${localStorage.token}`
  });
}

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
} 

function signup(){
  socket.emit('signup', { email: 'example@exmaple.com', password: '123'}, (error, user, token) => {
    if(error) console.log(error)

    localStorage.user = JSON.stringify(user)
    localStorage.token = `Bearer ${token}`
  })
}

export { subscribeToTimer, signup, restartSocket };