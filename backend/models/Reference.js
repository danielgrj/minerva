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
      enum: [
        'BOOK',
        'BOOK_SECTION',
        'ENCYCLOPEDIA_ARTICLE',
        'JOURNAL_ARTICLE',
        'MAGAZINE_ARTICLE',
        'NEWSPAPER_ARTICLE',
        'THESIS',
        'WEB_PAGE'
      ]
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
    doi: String,
    accessed: Date,
    archive: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Reference', referenceSchema);
