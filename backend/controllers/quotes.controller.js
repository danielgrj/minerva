const Quote = require('./../models/Quote');

exports.updateQuote = client => async ({ editorState, editorHtml }, id, referenceFrom) => {
  if (!id) {
    const quote = await Quote.create({ body: JSON.stringify(editorState), userFrom: client._id, html: editorHtml });
    client.emit('savedQuote', quote);
  }
  console.log(referenceFrom);
  const quote = await Quote.findByIdAndUpdate(id, {
    body: JSON.stringify(editorState),
    html: editorHtml
  });
  client.emit('updatedQuote', quote);
};

exports.updateOneQuote = async (req, res) => {
  const { id: _id } = req.params;
  const { referenceFrom } = req.body;
  const { id: userFrom } = req.user;

  console.log(referenceFrom);

  const quote = await Quote.findOneAndUpdate({ _id }, { referenceFrom });

  if (!quote) res.status(500).json({ msg: 'Something went wrong ' });
  console.log(quote);
  res.status(200).json(quote);
};

exports.createQuote = async (req, res) => {
  const { body, collectionFrom, referenceFrom, imageUrl, pages, name } = req.body;
  const { id: userFrom } = req.user;
  const quote = await Quote.create({ body, collectionFrom, referenceFrom, imageUrl, pages, userFrom, name });

  if (!quote) res.status(500).json({ msg: 'Something went wrong' });
  res.status(201).json(quote);
};

exports.getOneQuote = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const quote = await Quote.findOne({ _id });

  if (!quote) res.status(400).json({ msg: 'Not found' });
  res.status(200).json(quote);
};

exports.getAllQuotes = async (req, res) => {
  const { id: userFrom } = req.user;

  const quotes = await Quote.find({ userFrom });

  res.status(200).json(quotes);
};

exports.removeQuote = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userFrom } = req.user;

  const quote = await Quote.findOne({ _id, userFrom });
  await quote.remove();
  if (!quote) res.status(500).json({ msg: 'Server error' });

  res.status(200).json(quote);
};
