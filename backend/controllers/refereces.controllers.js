const Reference = require('./../models/Reference');

exports.createReference = async (req, res) => {
  const {
    type,
    title,
    authors,
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
    authors,
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

  const reference = await Reference.getReferenceWithQuotes({ _id, userFrom });
  if (!reference) return res.status(404).json({ msg: 'Reference not found' });

  console.log(reference);
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
    'authors',
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

  const reference = await Reference.findOne({ _id, userFrom });

  for (const key in req.body) {
    if (allowedUpdates.includes(key)) reference[key] = req.body[key];
  }

  await reference.save();

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
