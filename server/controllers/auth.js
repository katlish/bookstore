const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signUp = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			const error = new Error('User with the email already exists');
			error.statusCode = 409;
			throw error;
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		if (hashedPassword) {
			const user = new User({
				email: email,
				password: hashedPassword,
			});
			const result = await user.save();
			res.status(201).json({
				message: 'User created',
				userId: result._id,
			});
		}
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	let loggedinUser;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			const error = new Error('A user with this email was not found.');
			error.statusCode = 401;
			throw error;
		}
		loggedinUser = user;
		const isEqual = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error = new Error('Wrong password or email!');
			error.statusCode = 401;
			throw error;
		}
		// generating web token
		const token = jwt.sign(
			{
				email: loggedinUser.email,
				userId: loggedinUser._id.toString(),
				role: loggedinUser.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_TIME_EXPIRATION },
		);
		res.status(200).json({
			token,
			email: loggedinUser.email,
			userId: loggedinUser._id.toString(),
			role: loggedinUser.role,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
