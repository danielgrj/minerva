const router = require('express').Router();
const { getAllQuotes, getOneQuote, removeQuote, createQuote } = require('./../controllers/quotes.controller');
const { catchErrors } = require('./../middleware');

router.get('/', catchErrors(getAllQuotes));
router.post('/', catchErrors(createQuote));
router.get('/:id', catchErrors(getOneQuote));
router.delete('/:id', catchErrors(removeQuote));

module.exports = router;
