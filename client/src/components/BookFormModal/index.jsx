import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import BookForm from './BookForm';
import { Modal, Button, Spinner } from 'react-bootstrap';

export const validationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
	price: Yup.string().required('Price is required'),
	authorId: Yup.string(),
	publisherId: Yup.string(),
});

//TODO: dd lists for author and publisher
const BookFormModal = ({
	type,
	show,
	closeHandler,
	submitHandler,
	values,
	...rest
}) => {
	const formik = useFormik({
		initialValues: values,
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setStatus }) => {
			setStatus(null);
			try {
				await submitHandler(values);
				setStatus({
					type: 'success',
				});
			} catch (e) {
				console.log('e', e);
				setStatus({
					type: 'danger',
					text: e.response.data.message,
				});
			}
		},
	});

	const onClose = () => {
		formik.resetForm();
		closeHandler();
	};

	return (
		<Modal show={show} onHide={onClose} {...rest}>
			<Modal.Header closeButton>
				<Modal.Title>
					{type === 'edit' ? (
						<span>Edit The Book</span>
					) : (
						<span>Add New Book</span>
					)}
				</Modal.Title>
				{formik.isSubmitting && <Spinner animation="border" variant="info" />}
			</Modal.Header>
			<Modal.Body>
				<BookForm formik={formik} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
				<Button
					disabled={formik.isSubmitting}
					variant="success"
					onClick={formik.handleSubmit}
				>
					{type === 'edit' ? 'Update' : 'Add'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

BookFormModal.propTypes = {
	show: PropTypes.bool,
	type: PropTypes.oneOf(['edit', 'add']),
};

BookFormModal.defaultProps = {
	show: false,
	values: {
		title: '',
		price: '',
		authorId: '604b8bc137c29536a7c599da',
		publisherId: '604b8bc137c29536a7c599db',
	},
};

export default BookFormModal;
