const router = require('express').Router();
const {
  createReference,
  updateReference,
  removeReference,
  getOneReference,
  getAllReferences
} = require('./../controllers/refereces.controllers');
const { catchErrors } = require('./../middleware');

router.get('/', catchErrors(getAllReferences));
router.post('/', catchErrors(createReference));
router.get('/:id', catchErrors(getOneReference));
router.put('/:id', catchErrors(updateReference));
router.delete('/:id', catchErrors(removeReference));

module.exports = router;
