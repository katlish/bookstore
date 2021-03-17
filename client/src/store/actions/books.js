import * as actions from './constants';
import API from '../../API';

export const fetchBooks = () => async (dispatch) => {
	try {
		dispatch({ type: actions.FETCH_BOOKS_BEGIN });
		const { data } = await API.get('/books');
		dispatch({ type: actions.FETCH_BOOKS_SUCCESS, payload: data });
	} catch (e) {
		dispatch({
			type: actions.FETCH_BOOKS_FAILURE,
			payload: e.message,
		});
		throw e;
	}
};

export const addNewBook  = (newBook) => async (dispatch) => {
	try{
		dispatch({type: actions.ADD_NEW_BOOK_BEGIN});
		await API.post('/books', newBook);
		const { data } = await API.get('/books');
		dispatch({type: actions.ADD_NEW_BOOK_SUCCESS, payload: data});
	}catch(e){
		dispatch({
			type: actions.ADD_NEW_BOOK_FAILURE,
			payload: e.message,
		});
		throw e;
	}
}

export const updateBook = ({_id, title, price, authorId, publisherId}) => async (dispatch) => {
	try {
		const newValues = {
			title,
			price,
			authorId,
			publisherId
		}
		dispatch({type: actions.UPDATE_BOOK_BEGIN});
		const newBook = await API.patch(`/books/${_id}`, newValues);
		const books = await API.get('/books');
		const updatedBooks = [...books.data, newBook.data];
		dispatch({type: actions.UPDATE_BOOK_SUCCESS, payload: updatedBooks});
	}catch(e){
		dispatch({
			type: actions.UPDATE_BOOK_FAILURE,
			payload: e.message,
		});
		throw e;
	}
}

export const deleteBook = (id) => async (dispatch) => {
	try {
		dispatch({type: actions.DELETE_BOOK_BEGIN});
		await API.delete(`/books/${id}`);
		const { data } = await API.get('/books');
		dispatch({type: actions.DELETE_BOOK_SUCCESS, payload: data});
	}catch(e){
		dispatch({
			type: actions.DELETE_BOOK_FAILURE,
			payload: e.message,
		});
		throw e;
	}
} 

export const updateQuery = (query = "") => (dispatch) => {
	dispatch({type: actions.UPDATE_QUERY, payload: query})
}