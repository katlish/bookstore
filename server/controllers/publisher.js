const Publisher = require('../models/publisher');

exports.get = async (req, res, next) => {
	try {
		const publishers = await Publisher.find();
		const mappedPublishers = {};
		publishers.forEach((publisher) => {
			mappedPublishers[publisher._id] = publisher.name;
		});
		res.status(200).json(mappedPublishers);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
