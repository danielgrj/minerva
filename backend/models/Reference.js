const { model, Schema } = require('mongoose');

const referenceSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      firstName: String,
      lastName: String
    },
    volume: Number,
    edition: Number,
    place: String,
    publisher: String,
    date: Date,
    numberOfPage: Number,
    language: String,
    isbn: String,
    url: String,
    accessed: Date,
    archive: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Reference', referenceSchema);
