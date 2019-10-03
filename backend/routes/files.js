const router = require('express').Router();
const uploadFile = require('./../config/cloudinary');
const { uploadImage } = require('../controllers/files.controller');

router.post('/', uploadFile.single('image'), uploadImage);

module.exports = router;
