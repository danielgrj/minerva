const router = require('express').Router();
const {
  createCollection,
  getAllCollections,
  getOneCollection,
  updateCollection,
  removeCollection
} = require('./../controllers/collections.controller');
const { catchErrors } = require('./../middleware');

router.get('/', catchErrors(getAllCollections));
router.post('/', catchErrors(createCollection));
router.get('/:id', catchErrors(getOneCollection));
router.put('/:id', catchErrors(updateCollection));
router.delete('/:id', catchErrors(removeCollection));

module.exports = router;
