const jwt = require('jsonwebtoken');
const User = require('./../models/User');

exports.isLogout = (req, res, next) => {
  if (req.isAuthenticated()) next();
  res.status(400).send();
};

exports.isLoggedin = async (socket, next) => {
  const { token } = socket.handshake.query;
  const { _id } = jwt.verify(token, process.env.SECRET);
  const user = await User.findOne({ _id, 'tokens.token': token });
  socket._id = _id;
  if (user) next();
};
