const {Router} = require('express');
const router = Router();
const Question = require('../models/questions');
const {create, getAll, getOne, removeOne} = require('../controllers/questionController');


router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.post('/delete', removeOne);

module.exports = router;