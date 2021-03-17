const Author = require('../models/author');

//TODO: POST new author

exports.get = async (req, res, next) => {
	try {
		const authors = await Author.find();
		const mappedAuthors = {};
		authors.forEach((author) => {
			mappedAuthors[author._id] = author.name;
		});
		res.status(200).json(mappedAuthors);
	} catch (e) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
