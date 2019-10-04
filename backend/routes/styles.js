const router = require('express').Router();
const {
  createStyle,
  getOneStyle,
  getAllStyles,
  updateStyle,
  removeStyle
} = require('./../controllers/styles.controller');
const { catchErrors } = require('./../middleware');

router.get('/', catchErrors(getAllStyles));
router.post('/', catchErrors(createStyle));
router.get('/:id', catchErrors(getOneStyle));
router.put('/:id', catchErrors(updateStyle));
router.delete('/:id', catchErrors(removeStyle));

module.exports = router;
