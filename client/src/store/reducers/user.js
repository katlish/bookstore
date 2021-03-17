import * as actionTypes from '../actions/constants';
import API from '../../API';

const initialState = {
	isLoading: true,
	error: null,
	data: {},
	loggedIn: false,
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOGIN_BEGIN:
			return {
				...state,
				isLoading: true,
			};
		case actionTypes.LOGIN_SUCCESS: {
			localStorage.setItem('token', action.payload.token);
			API.defaults.headers.common = {
				Authorization: `bearer ${action.payload.token}`,
			};
			return {
				...state,
				isLoading: false,
				loggedIn: true,
				data: action.payload,
			};
		}
		case actionTypes.SET_USER: {
			API.defaults.headers.common = {
				Authorization: `bearer ${action.payload.token}`,
			};
			return {
				...state,
				loggedIn: true,
				data: action.payload.data,
			};
		}
		case actionTypes.LOGOUT: {
			localStorage.removeItem('token');
			return {
				...state,
				data: {},
				loggedIn: false,
			};
		}
		default:
			return state;
	}
}
