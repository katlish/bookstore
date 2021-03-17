module.exports = (req, res, next) => {
	if (req.user.role !== 'admin') {
		const error = new Error('Unauthorised');
		error.statusCode = 403;
		throw error;
	}
	next();
};
