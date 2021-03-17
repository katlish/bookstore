import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AuthForm from './AuthForm';
import { useHistory } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap';

export const validationSchema = Yup.object({
	email: Yup.string().trim().email().required('Email is required'),
	password: Yup.string()
		.trim()
		.min(6, 'at least 6 characters')
		.required('Password is required'),
});

const Auth = ({ show, logIn, signUp }) => {
	const [type, setType] = useState('signup');
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			password: '',
			email: '',
		},
		validationSchema,
		enableReinitialize: true,
		onSubmit: async (values, { setStatus }) => {
			setStatus(null);
			try {
				if (type === 'signup') {
					await signUp(values);
				} else {
					await logIn(values);
				}
				if (type === 'login') {
					history.push('/store');
				} else {
					setStatus({
						type: 'success',
						text: 'Success! Now you can Log In.',
					});
				}
			} catch (e) {
				console.log('e', e);
				setStatus({
					type: 'danger',
					text: e.response.data.message,
				});
			}
		},
	});
	const changeType = () => {
		setType(type === 'signup' ? 'login' : 'signup');
		formik.resetForm();
	};
	return (
		<Modal show={show} onHide={() => history.push('/store')} centered>
			<Modal.Header closeButton>
				<Modal.Title>{type === 'signup' ? 'Sign Up' : 'Log in'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AuthForm formik={formik} />
				{type === 'signup' ? (
					<div>
						Already have an account?{' '}
						<Button as="a" bsPrefix="unset" onClick={changeType}>
							Login
						</Button>
					</div>
				) : (
					<div>
						Back to{' '}
						<Button as="a" bsPrefix="unset" onClick={changeType}>
							Signup
						</Button>
					</div>
				)}
				{formik.status && (
					<div className={`text-${formik.status.type}`}>
						{formik.status.text}
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				{formik.isSubmitting && (
					<Spinner variant="info" animation="border" as="span" />
				)}
				<Button
					variant="success"
					onClick={formik.handleSubmit}
					disabled={formik.isSubmitting}
				>
					{type === 'signup' ? 'Sign Up' : 'Log In'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

Auth.propTypes = {
	show: PropTypes.bool,
	logIn: PropTypes.func.isRequired,
	signUp: PropTypes.func.isRequired,
};

Auth.defaultProps = {
	show: false,
};

export default Auth;
