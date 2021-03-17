import React from 'react';
import { Form } from 'react-bootstrap';

const AuthForm = ({ formik }) => {
	return (
		<Form noValidate>
			<Form.Group controlId="email">
				<Form.Label>Email</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					placeholder="type here"
					type="text"
					isInvalid={formik.touched.email && formik.errors.email}
					isValid={formik.touched.email && !formik.errors.email}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.email}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
					placeholder="type here"
					type="password"
					isInvalid={formik.touched.password && formik.errors.password}
					isValid={formik.touched.password && !formik.errors.password}
				></Form.Control>
				<Form.Control.Feedback type="invalid">
					{formik.errors.password}
				</Form.Control.Feedback>
			</Form.Group>
		</Form>
	);
};

export default AuthForm;
