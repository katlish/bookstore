const User = require('../models/user');
const Book = require('../models/book');

exports.getPurchases = async (req,res,next) => {
    try {
        const { userId } = req.user;
        const userFound = await User.findById(userId);
        const purchases = userFound.purchases;
        const books = await Book.find().where('_id').in(purchases).exec();
        res.status(200).json(books);
    }catch(err){
        if (!err.statusCode) {
			err.statusCode = 500;
        }
        err.message = 'getPurchases failed';
		next(err);
    }
}