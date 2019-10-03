require('dotenv').config();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const authRoutes = require('./routes/auth');
const filesRoutes = require('./routes/files');

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(res => {
    console.log(`Connected to Mongo! Database name: "${res.connections[0].name}"`);
  })
  .catch(err => console.error('Error connecting to mongo', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3001']
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/files', filesRoutes);

const { isLoggedin } = require('./middleware');

io.use(isLoggedin);

const { updateQuote } = require('./controllers/quotes.controller');

io.on('connection', client => {
  client.on('editQuote', updateQuote(client));

  client.on('subscribeToTimer', interval => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is up on http://localhost:${process.env.PORT}/`);
});
