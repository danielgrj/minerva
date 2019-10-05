const { model, Schema } = require('mongoose');

const noteSchema = new Schema({
  name: String,
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  },
  quoteFrom: {
    type: Schema.Types.ObjectId,
    ref: 'Quote'
  }
});

module.exports = model('Note', noteSchema);
