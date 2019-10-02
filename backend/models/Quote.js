const { model, Schema } = require('mongoose');

const quoteSchema = new Schema({
  reference: {
    type: Schema.Types.ObjectId,
    ref: 'Reference'
  },
  body: {
    type: String,
    required: true
  },
  imageUrl: String,
  pages: String
});

module.exports = model('Quote', quoteSchema);
