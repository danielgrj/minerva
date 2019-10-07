const Collection = require('./../models/Collection');

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

  const collection = await Collection.findOne({ _id, userFrom }).populate('quotes');
  if (!collection) res.status(404).json({ msg: 'Not ' });
  res.status(200).json(collection);
};

exports.getAllCollections = async (req, res) => {
  const { id: userFrom } = req.user;

  const collections = await Collection.find({ userFrom });

  res.status(200).json(collections);
};

exports.updateCollection = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;
  const updates = {};

  const allowedUpdates = ['name', 'contributors', 'quotes'];

  for (const key in req.body) {
    if (allowedUpdates.includes(key)) updates[key] = req.body[key];
  }

  const collection = await Collection.findOneAndUpdate({ _id, userFrom }, updates, { new: true });

  if (!collection) return res.status(500).json({ msg: 'Server error ' });
  res.status(200).json(collection);
};

exports.removeCollection = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const collection = await Collection.findOneAndDelete({ _id, userFrom });

  if (!collection) return res.status(500).json({ msg: 'Server erro' });
  res.status(200).json(collection);
};
