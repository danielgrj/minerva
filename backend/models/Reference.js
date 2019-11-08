const { model, Schema } = require('mongoose');
const Quote = require('./Quote');

const referenceSchema = new Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    authors: [
      {
        firstName: String,
        lastName: String
      }
    ],
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

referenceSchema.statics.getReferenceWithQuotes = async function(data) {
  const reference = await this.findOne(data);

  if (!reference) return null;

  const quotes = await Quote.find({ referenceFrom: data._id });

  reference.quotes = quotes;
  // console.log(reference.quotes);

  return reference;
};

referenceSchema.methods.toJSON = function() {
  const reference = this;
  const referenceObject = reference.toObject();

  delete referenceObject.hash;
  delete referenceObject.tokens;
  delete referenceObject.salt;

  referenceObject.quotes = reference.quotes;

  return referenceObject;
};

module.exports = model('Reference', referenceSchema);
