const { model, Schema } = require('mongoose');
const Collection = require('./Collection');

const quoteSchema = new Schema({
  referenceFrom: {
    type: Schema.Types.ObjectId,
    ref: 'Reference'
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  body: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  },
  imageUrl: String,
  pages: String
});

quoteSchema.pre('remove', async function(next) {
  const quote = this;
  const collections = await Collection.find({ quotes: quote._id });

  for (let i = 0; i < collections.length; i++) {
    collections[i].quotes = collections[i].quotes.filter(
      currentQuote => currentQuote.toString() !== quote._id.toString()
    );
    await collections[i].save();
    console.log(collections[i]);
  }

  next();
});

module.exports = model('Quote', quoteSchema);
