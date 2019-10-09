const User = require('../models/User');

exports.login = async (req, res) => {
  const token = await req.user.generateAuthToken();

  res.status(200).json({ user: req.user, token });
};

exports.createUser = async (req, res) => {
  const { email, name, password } = req.body;

  const user = await User.register({ email, name }, password);
  if (!user) return res.status(500);
  const token = await user.generateAuthToken();

  res.status(201).json({ user, token });
};

exports.updateUser = async (req, res) => {
  const { email, name, password } = req.body;
  const { id } = req.user;

  const updates = { email, name, password };
  if (req.file) updates.avatar = req.file.secure_url;

  const user = await User.findByIdAndUpdate(id, updates);

  res.status(201).json(user);
};

exports.logout = async (req, res) => {
  const { token } = req.body;
  await User.removeAuthToken(token);
  req.logout();

  res.status(200).json({ msg: 'ok' });
};
