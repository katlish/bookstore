const express = require('express');
const publisherController = require('../controllers/publisher');
const router = express.Router();

router.get('/', publisherController.get);

module.exports = router;
