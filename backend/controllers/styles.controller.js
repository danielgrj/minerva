const Style = require('./../models/Style');

exports.createStyle = (req, res) => {
  const { id: userFrom } = req.user;
  const { model } = req.body;

  const style = await Style.create({ userFrom, model });

  if(!style) return res.status(500).json({msg: 'Server error'});
  res.status(200).json(style);
}

exports.getAllStyles = (req, res) => {
  const { id: userFrom } = req.user;

  const styles = await Style.find({ userFrom });

  res.status(200).json(styles);
}

exports.getOneStyle = (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const style = await Style.find({ _id, userFrom });

  if(!style) return res.status(404).json({ msg: 'Not Found'});
  res.status(200).json(style);
}

exports.updateStyle = (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;
  const { model } = req.body

  const style = await Style.findOneAndUpdate({ _id, userFrom}, { model }, { new: true})

  if(!style) return res.status(500).json({ msg: 'Server error'})
  res.status.json(style)
}

exports.removeStyle = (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const style = await Style.findOneAndDelete({ _id, userFrom })
  if (!style) return res.status(500).json({ msg: 'Server error' })
  res.status.json(style)
}