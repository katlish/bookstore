import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchBooks,
	addNewBook,
	updateBook,
	deleteBook,
} from '../store/actions/books';
import BooksList from '../components/BooksList';
import BookFormModal from '../components/BookFormModal';
import { Spinner, Button } from 'react-bootstrap';
import { selectVisibleBooks } from '../store/selectors/books';
import { Redirect } from 'react-router-dom';

const AdminPanel = () => {
	const [showAddBookModal, setShowAddBookModal] = useState(false);

	const user = useSelector(state => state.user.data);
	const books = useSelector(selectVisibleBooks);
	const isLoading = useSelector(state => state.books.isLoading);
	const publishers = useSelector(state => state.metadata.publishers.data);
	const authors = useSelector(state => state.metadata.authors.data);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchBooks());
	}, []);
	if (!user) {
		return null;
	}
	if (user.role !== 'admin') {
		return <Redirect to="/auth" />;
	}

	return (
		<>
			<div className="py-4">
				<div className="d-flex mb-4">
					<h3 className="text-left">
						Admin Panel
						{isLoading && (
							<Spinner as="span" variant="info" animation="border" />
						)}
					</h3>
					<Button
						onClick={() => setShowAddBookModal(true)}
						variant="success"
						className="ml-auto"
					>
						Add Book
					</Button>
				</div>
				<BooksList
					books={books}
					publishers={publishers}
					authors={authors}
					editable
					updateBook={newValues => dispatch(updateBook(newValues))}
					deleteBook={id => dispatch(deleteBook(id))}
				/>
			</div>
			<BookFormModal
				centered
				show={showAddBookModal}
				closeHandler={() => setShowAddBookModal(false)}
				submitHandler={data => dispatch(addNewBook(data))}
				type="add"
			/>
		</>
	);
};

export default AdminPanel;
