const Note = require('./../models/Note');

exports.createNote = async (req, res) => {
  const { id: userFrom } = req.user;
  const { body, quoteFrom } = req.body;

  const note = await Note.create({ userFrom, body, quoteFrom });

  if (!note) return res.status(500).json({ msg: 'Server error' });
  res.status(201).json(note);
};

exports.getAllNotes = async (req, res) => {
  const { id: userFrom } = req.user;

  const notes = await Note.find({ userFrom });

  res.status(200).json(notes);
};

exports.getOneNote = async (req, res) => {
  const { id: userFrom } = req.user;
  const { id: _id } = req.params;

  const note = await Note.findOne({ _id, userFrom });

  if (!note) return res.status(404).json({ msg: 'Not found' });
  res.status(200).json(note);
};

exports.updateNote = async (req, res) => {
  const { id: userFrom } = req.user;
  const { id: _id } = req.params;
  const { body } = req.body;

  const note = await Note.findOneAndUpdate({ userFrom, _id });

  if (!note) return res.status(500).json({ msg: 'Server error' });
  res.status(200).json(note);
};

exports.removeUpdate = async (req, res) => {
  const { id: userFrom } = req.user;
  const { id: _id } = req.params;

  const note = await Note.findOneAndRemove({ userFrom, _id });

  if (!note) return res.status(500).json({ msg: 'Server error' });
  res.status(200).json(note);
};
