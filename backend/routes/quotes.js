const router = require('express').Router();
const {
  getAllQuotes,
  getOneQuote,
  removeQuote,
  createQuote,
  updateOneQuote
} = require('./../controllers/quotes.controller');
const { catchErrors } = require('./../middleware');

router.get('/', catchErrors(getAllQuotes));
router.post('/', catchErrors(createQuote));
router.get('/:id', catchErrors(getOneQuote));
router.put('/:id', catchErrors(updateOneQuote));
router.delete('/:id', catchErrors(removeQuote));

module.exports = router;
