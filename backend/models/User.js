const { model, Schema } = require('mongoose');
const plm = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    name: String,
    hash: {
      type: String,
      required: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);

  user.tokens.push({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.hash;
  delete userObject.tokens;
  delete userObject.salt;

  return userObject;
};

userSchema.statics.findByCredentials = async function(email, password) {
  const [user] = await this.find({ email });

  const isMatch = bcrypt.compareSync(password, user.hash);
  if (isMatch) throw new Error('Unable to login');

  return user;
};

userSchema.statics.removeAuthToken = async function(token) {
  const decoded = jwt.decode(token);
  const user = await this.findById(decoded._id);

  user.tokens = user.tokens.filter(currentToken => currentToken.token !== token);

  await user.save();
};

userSchema.plugin(plm, { usernameField: 'email' });

module.exports = model('User', userSchema);
