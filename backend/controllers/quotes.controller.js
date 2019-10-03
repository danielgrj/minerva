const Quote = require('./../models/Quote');

exports.updateQuote = client => async (editorState, id) => {
  if (!id) {
    const quote = await Quote.create({ body: JSON.stringify(editorState), user: client._id });
    client.emit('savedQuote', quote);
  }
  await Quote.findByIdAndUpdate(id, { body: JSON.stringify(editorState) });
};
