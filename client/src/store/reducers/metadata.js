import * as actionTypes from '../actions/constants';

const initialState = {
	error: null,
	authors: {
		isLoading: false,
		data: {},
	},
	publishers: {
		isLoading: true,
		data: {},
	},
};

export default function metadata(state = initialState, action) {
	switch (action.type) {
		case actionTypes.FETCH_AUTHORS_BEGIN:
			return {
				...state,
				authors: {
					...state.authors,
					isLoading: true,
				},
			};
		case actionTypes.FETCH_PUBLISHERS_BEGIN:
			return {
				...state,
				publishers: {
					...state.publishers,
					isLoading: true,
				},
			};
		case actionTypes.FETCH_AUTHORS_SUCCESS:
			return {
				...state,
				authors: {
					isLoading: false,
					data: action.payload,
				},
			};
		case actionTypes.FETCH_PUBLISHERS_SUCCESS:
			return {
				...state,
				publishers: {
					isLoading: false,
					data: action.payload,
				},
			};
		default:
			return state;
	}
}
