import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BooksList from '../components/BooksList';
import { fetchBooks } from '../store/actions/books';
import { getUserPurchases } from '../store/actions/user';
import { Spinner } from 'react-bootstrap';
import { selectVisibleBooks } from '../store/selectors/books';

//TODO: if role=user show BUY button
const BooksStore = () => {
	const user = useSelector(state => state.user.data);
	const books = useSelector(selectVisibleBooks);
	const isLoading = useSelector(state => state.books.isLoading);
	const publishers = useSelector(state => state.metadata.publishers.data);
	const authors = useSelector(state => state.metadata.authors.data);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBooks());
	}, []);

	return (
		<div className="py-4">
			<h3 className="text-left mb-4">
				Books
				{isLoading && <Spinner as="span" variant="info" animation="border" />}
			</h3>
			<BooksList
				withBuy={user.role === 'user'}
				books={books}
				publishers={publishers}
				authors={authors}
				buyBook={() => dispatch(getUserPurchases())}
			/>
		</div>
	);
};

export default BooksStore;
