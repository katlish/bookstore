const express = require('express');
const authorController = require('../controllers/author');
const router = express.Router();

router.get('/', authorController.get);

module.exports = router;
