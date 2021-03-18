import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import Auth from './components/Auth';
import Header from './components/Header';
import AdminPanel from './containers/AdminPanel';
import { Container } from 'react-bootstrap';
import BooksStore from './containers/BooksStore';
import MyPurchases from './containers/MyPurchases';
import { fetchAuthors, fetchPublishers } from './store/actions/metadata';
import { logIn, signUp, logOut, setUserData } from './store/actions/user';
import { updateQuery } from './store/actions/books';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
	const user = useSelector((state) => state.user.data);
	const loggedIn = useSelector((state) => state.user.loggedIn);
	const token = localStorage.getItem('token');
	const dispatch = useDispatch();
	useEffect(() => {
		batch(() => {
			dispatch(fetchAuthors());
			dispatch(fetchPublishers());
		});
		if (token) {
			dispatch(setUserData(token));
		}
	}, []);

	const searchHandler = (query) => {
		dispatch(updateQuery(query));
	}
	console.log("user?.role === user", user.role);
	return (
		<div className="App">
			<Header
				loggedIn={loggedIn}
				user={user}
				logout={() => dispatch(logOut())}
				searchHandler={searchHandler}
			/>
			<Container>
				<Switch>
					<Route path="/" exact>
						<Redirect to="/store" />
					</Route>
					<Route path="/auth">
						{!user?.email ? (
							<Auth
								show
								logIn={(data) => dispatch(logIn(data))}
								signUp={(data) => dispatch(signUp(data))}
							/>
						) : (
							<Redirect to="/store" />
						)}
					</Route>
					<Route path="/store">
						<BooksStore />
					</Route>
					<Route path="/admin-panel" exact>
						{user?.role === 'admin' ? <AdminPanel /> : <Redirect to="/store" />}
					</Route>
					<Route path="/purchase-history" exact>
						{user?.role === 'user' ?  <MyPurchases/> : <Redirect to="/store" />}
					</Route>
				</Switch>
			</Container>
		</div>
	);
}

export default App;
