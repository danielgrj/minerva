const { model, Schema } = require('mongoose');

const quoteSchema = new Schema({
  referenceFrom: {
    type: Schema.Types.ObjectId,
    ref: 'Reference'
  },
  collectionFrom: {
    type: Schema.Types.ObjectId,
    ref: 'Collection'
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  },
  imageUrl: String,
  pages: String
});

module.exports = model('Quote', quoteSchema);
