const Reference = require('./../models/Reference');

exports.createReference = async (req, res) => {
  const {
    type,
    title,
    author,
    volume,
    edition,
    place,
    publisher,
    date,
    numberOfPages,
    language,
    isbn,
    url,
    doi,
    accessed,
    archive
  } = req.body;
  const { id: userFrom } = req.user;

  const reference = await Reference.create({
    type,
    userFrom,
    title,
    author,
    volume,
    edition,
    place,
    publisher,
    date,
    numberOfPages,
    language,
    isbn,
    url,
    doi,
    accessed,
    archive
  });

  if (!reference) return res.status(500).json({ msg: 'Server error' });
  res.status(201).json(reference);
};

exports.getOneReference = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const reference = await Reference.findOne({ _id, userFrom });
  if (!reference) return res.status(404).json({ msg: 'Reference not found' });
  res.status(200).json(reference);
};

exports.getAllReferences = async (req, res) => {
  const { id: userFrom } = req.user;

  const references = await Reference.find({ userFrom });

  res.status(200).json(references);
};

exports.updateReference = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const allowedUpdates = [
    'type',
    'title',
    'author',
    'volumen',
    'edition',
    'place',
    'publisher',
    'date',
    'numberOfPages',
    'language',
    'isbn',
    'url',
    'doi',
    'accessed',
    'archive'
  ];

  const updates = {};

  for (const key in req.body) {
    if (allowedUpdates.includes(key)) updates[key] = req.body[key];
  }

  const reference = await Reference.findOneAndUpdate({ _id, userFrom }, updates, { new: true });

  if (!reference) return res.status(500).json({ msg: 'Server error' });
  res.status(200).json(reference);
};

exports.removeReference = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const reference = await Reference.findOneAndDelete({ _id, userFrom });

  if (!reference) return res.status(500).json({ msg: 'Server error' });
  res.status(200).json(reference);
};
