const jwt = require('jsonwebtoken');
const User = require('./../models/User');

exports.isLogout = (req, res, next) => {
  if (req.isAuthenticated()) next();
  res.status(400).send();
};

exports.catchErrors = fn => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

exports.loginSocket = async (socket, next) => {
  try {
    const { token } = socket.handshake.query;
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id, 'tokens.token': token });
    socket._id = _id;
    if (user) next();
  } catch (e) {
    console.log('Not connected to socket');
  }
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
};

exports.isLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  if (req.user.isEmployee) return res.redirect('/user/emp/profile');
  res.redirect('/search');
};
