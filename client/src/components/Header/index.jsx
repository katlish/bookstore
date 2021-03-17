import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ user, loggedIn, logout, searchHandler }) => {
	const handleChange = e => {
		searchHandler(e.target.value);
	};
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Link className="navbar-brand" to="/store">
					Books Store
				</Link>
				<Nav className="mr-auto">
					{user?.role === 'admin' && (
						<Link className="nav-link" to="/admin-panel">
							Admin Panel
						</Link>
					)}
				</Nav>
				{!loggedIn ? (
					<Link className="nav-link" to="/auth">
						Sign Up
					</Link>
				) : (
					<div className="d-flex align-items-center">
						<span className="text-white">Hi, {user.email}!</span>
						<Button onClick={logout} as="a" variant="link" className="nav-link">
							Log Out
						</Button>
					</div>
				)}
				<Form inline>
					<Form.Control
						onChange={handleChange}
						type="text"
						placeholder="Search"
						className="mr-sm-2"
					/>
				</Form>
			</Container>
		</Navbar>
	);
};

Header.propTypes = {
	user: PropTypes.object,
	loggedIn: PropTypes.bool,
};

export default Header;
