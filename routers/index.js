const {Router} = require('express');
const router = Router();
const questionRoute = require('./questionRoute');

router.use('/question', questionRoute);

module.exports = router;