const {Router} = require('express');
const router = Router();
const Question = require('../models/questions');
const {create, getAll, getOne} = require('../controllers/questionController');


router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);




module.exports = router;