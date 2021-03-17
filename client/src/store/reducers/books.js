import * as actionTypes from '../actions/constants';

const initialState = {
	isLoading: true,
	searchQuery: '',
	error: null,
	data: [],
};

export default function books(state = initialState, action) {
	switch (action.type) {
		case actionTypes.FETCH_BOOKS_BEGIN:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.FETCH_BOOKS_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		case actionTypes.FETCH_BOOKS_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}
		case actionTypes.ADD_NEW_BOOK_BEGIN: {
			return {
				...state,
				isLoading: true
			};
		}
		case actionTypes.ADD_NEW_BOOK_SUCCESS: {
			return {
				...state,
				isLoading: false,
				data: action.payload
			};
		}
		case actionTypes.ADD_NEW_BOOK_FAILURE: {
			return {
				...state,
				isLoading: false
			};
		}
		case actionTypes.UPDATE_BOOK_BEGIN: {
			return {
				...state,
				isLoading: true
			};
		}
		case actionTypes.UPDATE_BOOK_SUCCESS: {
			return {
				...state,
				isLoading: false,
				data: action.payload
			};
		}
		case actionTypes.UPDATE_BOOK_FAILURE: {
			return {
				...state,
				isLoading: false
			};
		}
		case actionTypes.DELETE_BOOK_BEGIN: {
			return {
				...state,
				isLoading: true
			};
		}
		case actionTypes.DELETE_BOOK_SUCCESS: {
			return {
				...state,
				isLoading: false,
				data: action.payload
			};
		}
		case actionTypes.DELETE_BOOK_FAILURE: {
			return {
				...state,
				isLoading: false
			};
		}
		case actionTypes.UPDATE_QUERY: {
			return {
				...state,
				searchQuery: action.payload
			};
		}
		default:
			return state;
	}
}
