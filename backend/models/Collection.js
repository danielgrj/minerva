const { model, Schema } = require('mongoose');

const colletionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    required: true
  },
  defaultStyle: {
    type: Schema.Types.ObjectId
  },
  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    }
  ],
  quotes: [
    {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'Quote'
    }
  ]
});

module.exports = model('Collection', colletionSchema);
