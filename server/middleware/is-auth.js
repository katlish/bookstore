const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	let decodedToken;

	if (!authHeader) {
		const error = new Error('Not authenticated');
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.split(' ')[1];
	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		err.statusCode = 401;
		throw err;
	}
	if (!decodedToken) {
		const error = new Error('Not authenticated');
		error.statusCode = 401;
		throw error;
	}
	req.user = {
		userId: decodedToken.userId,
		role: decodedToken.role,
	};
	next();
};
