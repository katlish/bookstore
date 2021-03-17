import React from 'react';
import { Form } from 'react-bootstrap';

const BookForm = ({ formik }) => {
	return (
		<Form noValidate>
			<Form.Group controlId="title">
				<Form.Label>Title</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.title}
					placeholder="type here"
					type="text"
					isInvalid={formik.touched.title && formik.errors.title}
					isValid={formik.touched.title && !formik.errors.title}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.title}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group controlId="price">
				<Form.Label>Price</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.price}
					placeholder="type here"
					type="number"
					isInvalid={formik.touched.price && formik.errors.price}
					isValid={formik.touched.price && !formik.errors.price}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.price}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group controlId="authorId">
				<Form.Label>AuthorId</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.authorId}
					placeholder="type here"
					type="text"
					isInvalid={formik.touched.authorId && formik.errors.authorId}
					isValid={formik.touched.authorId && !formik.errors.authorId}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.authorId}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group controlId="publisherId">
				<Form.Label>PublisherId</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.publisherId}
					placeholder="type here"
					type="text"
					isInvalid={formik.touched.publisherId && formik.errors.publisherId}
					isValid={formik.touched.publisherId && !formik.errors.publisherId}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.publisherId}
				</Form.Control.Feedback>
			</Form.Group>
		</Form>
	);
};

export default BookForm;
