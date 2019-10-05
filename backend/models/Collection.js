const { model, Schema } = require('mongoose');

const colletionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userFrom: {
    type: String,
    required: true
  },
  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  quotes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quote'
    }
  ]
});

module.exports = model('Collection', colletionSchema);
