const router = require('express').Router();
const passport = require('./../config/passport');
const { login, createUser, logout, updateUser } = require('./../controllers/auth.controller');
const { isLoggedIn } = require('./../middleware');

router.post('/login', passport.authenticate('local'), login);
router.post('/signup', createUser);
router.post('/logout', logout);
router.post('/edit', isLoggedIn, updateUser);

module.exports = router;
