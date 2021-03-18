import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BooksList = ({
	withBuy,
	books,
	publishers,
	authors,
	editable,
	updateBook,
	deleteBook,
	buyBook,
}) => {
	if (!books.length) return null;
	return (
		<div className="books-list d-flex flex-wrap">
			{books.map((book, i) => (
				<Book
					withBuy={withBuy}
					updateBook={updateBook}
					deleteBook={deleteBook}
					buyBook={buyBook}
					editable={editable}
					book={{
						...book,
						publisher: publishers[book.publisherId],
						author: authors[book.authorId],
					}}
					key={i}
				/>
			))}
		</div>
	);
};

BooksList.propTypes = {
	books: PropTypes.array,
	publishers: PropTypes.object,
	authors: PropTypes.object,
	editable: PropTypes.bool,
};

BooksList.defaultProps = {
	editable: false,
};

export default BooksList;
