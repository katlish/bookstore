const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// routes
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const publishersRoutes = require('./routes/publishers');
const userRoutes =require('./routes/user');

require('dotenv').config();

const app = express();

app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	}),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/authors', authorsRoutes);
app.use('/publishers', publishersRoutes);
app.use('/books', booksRoutes);
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
	const { statusCode, message, data } = error;
	res.status(statusCode).json({ message, data });
});

mongoose
	.connect(
		process.env.DB_CONNECTION,
		{ useNewUrlParser: true, useUnifiedTopology: true },
	)
	.then((result) => {
		app.listen(3080, () => console.log('Server is running'));
		// try {
		//   Author.create({
		//     name: "John Doe",
		//   });
		//   Author.create({
		//     name: "Alex Zilman",
		//   });
		//   Author.create({
		//     name: "Max Terner",
		//   });
		//   Author.create({
		//     name: "Mary Berman",
		//   });
		//   Publisher.create({ name: "Penguin Random House" });
		//   Publisher.create({ name: "Hachette Livre" });
		//   Publisher.create({ name: "HarperCollins" });
		//   Publisher.create({ name: "Macmillan" });
		//   Publisher.create({ name: "Simon & Schuster" });
		// } catch (e) {
		//   console.log("seeds err", e);
		// }
	})
	.catch((e) => console.log('err', e));
