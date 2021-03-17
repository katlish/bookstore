const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		authorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Author',
		},
		price: {
			type: Number,
		},
		publisherId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Publisher',
		},
		deleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Book', bookSchema);
