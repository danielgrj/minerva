const { model, Schema } = require('mongoose');

const noteSchema = new Schema({
  name: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  },
  attchedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Quote'
  }
});

module.exports = model('Note', noteSchema);
