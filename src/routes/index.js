const express = require('express');
const router = express.Router();
const controller = require('../controllers/ad')

router.get('/', controller.getAll);
router.get('/:id', controller.getOneById);
router.post('/', controller.create);

module.exports = router;