const router = require('express').Router();
const { createNote, getAllNotes, getOneNote, updateNote, removeUpdate } = require('./../controllers/notes.controller');
const { catchErrors } = require('./../middleware');

router.get('/', catchErrors(getAllNotes));
router.post('/', catchErrors(createNote));
router.get('/:id', catchErrors(getOneNote));
router.put('/:id', catchErrors(updateNote));
router.delete('/:id', catchErrors(removeUpdate));

module.exports = router;
