const router = require('express').Router();
const passport = require('./../config/passport');
const { login, createUser, logout } = require('./../controllers/auth.controller');

router.post('/login', passport.authenticate('local'), login);
router.post('/signup', createUser);
router.post('/logout', logout);

module.exports = router;
