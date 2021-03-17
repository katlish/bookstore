import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import BookFormModal from '../../BookFormModal';
import './Book.scss';

const Book = ({
	book: { _id, title, price, author, publisher },
	editable,
	deleteBook,
	updateBook,
}) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(null);
	return (
		<>
			<Card className="book-card d-flex m-2 text-left shadow-sm">
				<Card.Header className="d-flex align-items-center">
					<Card.Title className="text-info mb-0">{title}</Card.Title>
					{editable && (
						<div className="ml-auto">
							<Button
								onClick={() => setShowEditModal(true)}
								variant="link"
								className="px-1 py-0 text-dark"
							>
								<MdEdit />
							</Button>
							<Button
								onClick={() => setShowConfirmDeleteModal({ title, _id })}
								variant="link"
								className="px-1 py-0 text-dark"
							>
								<MdDelete />
							</Button>
						</div>
					)}
				</Card.Header>
				<Card.Body>
					<Card.Subtitle className="mb-2">Author: {author}</Card.Subtitle>
					<Card.Subtitle className="mb-2">Publisher: {publisher}</Card.Subtitle>
					<Card.Text>Price: ${price}</Card.Text>
				</Card.Body>
			</Card>
			<BookFormModal
				centered
				show={showEditModal}
				closeHandler={() => setShowEditModal(false)}
				submitHandler={updateBook}
				values={{
					_id,
					title,
					price,
					author,
					publisher,
				}}
				type="edit"
			/>
			<Modal
				show={Boolean(showConfirmDeleteModal)}
				centered
				onHide={() => setShowConfirmDeleteModal(null)}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Are you sure you want to delete {showConfirmDeleteModal?.title}
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button
						variant="danger"
						onClick={() => deleteBook(showConfirmDeleteModal?._id)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Book;
