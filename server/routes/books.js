const express = require('express');
const booksController = require('../controllers/books');
const isAdmin = require('../middleware/is-admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', booksController.get);

router.post('/', isAuth, isAdmin, booksController.create);

router.patch('/:id', isAuth, isAdmin, booksController.update);

router.delete('/:id', isAuth, isAdmin, booksController.delete);

router.post('/:id/purchase', isAuth, booksController.purchase);

module.exports = router;
