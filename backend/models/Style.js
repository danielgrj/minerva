const { model, Schema } = require('mongoose');

const styleSchema = new Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  model: {
    type: String,
    required: true
  }
});

module.exports = model('Style', styleSchema);
