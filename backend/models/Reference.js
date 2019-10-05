const { model, Schema } = require('mongoose');

const referenceSchema = new Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      firstName: String,
      lastName: String
    },
    type: {
      type: String,
      required: true,
      enum: ['BOOK', 'ARTICLE']
    },
    volume: Number,
    edition: Number,
    place: String,
    publisher: String,
    date: Date,
    numberOfPages: Number,
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
