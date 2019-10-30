const Collection = require('./../models/Collection');
const User = require('./../models/User');

exports.createCollection = async (req, res) => {
  const { name, defaultStyle } = req.body;
  const { id: userFrom } = req.user;

  const collection = await Collection.create({ name, userFrom });

  if (!collection) return res.status(500).json({ msg: 'Server error' });

  res.status(201).json(collection);
};

exports.getOneCollection = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const collection = await Collection.findOne({ _id, $or: [{ userFrom }, { contributors: userFrom }] })
    .populate('quotes')
    .populate('userFrom')
    .populate('collaborators');
  if (!collection) res.status(404).json({ msg: 'Not found' });
  res.status(200).json(collection);
};

exports.getAllCollections = async (req, res) => {
  const { id: userFrom } = req.user;

  const collections = await Collection.find({ $or: [{ userFrom }, { contributors: userFrom }] });

  res.status(200).json(collections);
};

exports.updateCollection = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;
  const { email } = req.body;

  const updates = {};

  const allowedUpdates = ['name', 'contributors', 'quotes'];

  for (const key in req.body) {
    if (allowedUpdates.includes(key)) updates[key] = req.body[key];
  }

  console.log(email);
  if (email) {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: 'User not found' });
    if (user._id !== req.user._id) updates['$push'] = { contributors: user._id };
  }

  const collection = await Collection.findOneAndUpdate(
    { _id, $or: [{ userFrom }, { contributors: userFrom }] },
    updates,
    { new: true }
  );

  if (!collection) return res.status(500).json({ msg: 'Server error ' });
  res.status(200).json(collection);
};

exports.removeCollection = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const collection = await Collection.findOneAndDelete({ _id, userFrom });

  if (!collection) return res.status(401).json({ msg: 'You cannot delete this collection' });
  res.status(200).json(collection);
};
