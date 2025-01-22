const {Router} = require('express');
const router = Router();
const Question = require('../models/questions');
const {create, getAll, getOne, removeOne} = require('../controllers/questionController');


router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.delete('/:id', (req, res, next) => {
    console.log(`DELETE request received with ID: ${req.params.id}`);
    next();
}, removeOne);

module.exports = router;