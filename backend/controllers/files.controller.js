exports.uploadImage = (req, res) => {
  if (req.file) return res.status(200).json({ msg: 'Ok', url: req.file.secure_url });
  res.status(400).json({ msg: 'A file is required' });
};
