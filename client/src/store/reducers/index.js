import { combineReducers } from 'redux';
import user from './user';
import books from './books';
import metadata from './metadata';

export default combineReducers({
	user,
	books,
	metadata,
});
