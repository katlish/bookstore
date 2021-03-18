const Book = require('../models/book');

exports.get = async (req, res, next) => {
	try {
		const books = await Book.find();
		res.status(200).json(books);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.create = async (req, res, next) => {
	try {
		const { title, price, authorId, publisherId } = req.body;
		const createdBook = await Book.create({
			title,
			price,
			authorId,
			publisherId,
		});
		res.status(201).json(createdBook);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.update = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(200).json(updatedBook);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.delete = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(404).end();
		}
		await Book.findByIdAndUpdate(id, { deleted: true });
		res.status(204).end();
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.purchase = async (req, res, next) => {
	const { booksIds } = req.body;
	try {
		res.status(200).json({ mesg: 'success' });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
