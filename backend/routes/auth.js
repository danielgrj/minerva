const router = require('express').Router();
const passport = require('./../config/passport');
const { login, createUser, logout, updateUser } = require('./../controllers/auth.controller');
const { isLoggedIn } = require('./../middleware');

router.post('/login', passport.authenticate('local'), login);
router.post('/signup', createUser);
router.post('/logout', logout);
router.post('/edit', isLoggedIn, updateUser);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'], display: 'popup' }));
router.get('/facebook/callback', (req, res, next) =>
  passport.authenticate('facebook' /*, finishSignup(req, res, next))(req, res, next*/)
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], display: 'popup' }));
router.get(
  '/google/callback',
  passport.authenticate('google' /*, finishSignup(req, res, next))(req, res, next*/, {
    successRedirect: 'http://localhost:3001/'
  })
);

module.exports = router;
