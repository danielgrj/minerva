const passport = require('passport');
const User = require('./../models/User');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(User.createStrategy());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `/api/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, cb) => {
      const { id: facebookId, displayName: name, emails, photos } = profile;
      const user = await User.findOne({ facebookId });

      if (user) return cb(null, user);
      const newUser = await User.create({
        facebookId,
        name,
        email: emails ? emails[0].value : undefined,
        avatar: photos[0].value
      });
      cb(null, newUser);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/api/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, cb) => {
      const { id: googleId, displayName: name, photos, emails } = profile;
      const user = await User.findOne({ googleId });

      if (user) return cb(null, user);
      const newUser = await User.create({
        googleId,
        name,
        avatar: photos[0].value,
        email: emails ? emails[0].value : undefined
      });
      cb(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
