import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPurchases } from '../store/actions/user';
import BooksList from '../components/BooksList';

const MyPurchases = () => {
	const dispatch = useDispatch();
	const userPurchases = useSelector(state => state.user.purchaseHistory);
	const publishers = useSelector(state => state.metadata.publishers.data);
	const authors = useSelector(state => state.metadata.authors.data);

	useEffect(() => {
		dispatch(getUserPurchases());
	}, []);

	return (
		<div className="py-4">
			<h1>My Purchase History</h1>
			<BooksList
				books={userPurchases}
				publishers={publishers}
				authors={authors}
			/>
		</div>
	);
};

export default MyPurchases;
