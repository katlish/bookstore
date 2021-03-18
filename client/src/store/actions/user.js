import * as actions from './constants';
import jwt from 'jwt-decode';
import API from '../../API';

export const signUp = (data) => async (dispatch) => {
	try {
		dispatch({ type: actions.SIGN_UP_BEGIN });
		await API.post('/auth/signup', data);
		dispatch({ type: actions.SIGN_UP_SUCCESS });
	} catch (e) {
		dispatch({
			type: actions.SIGN_UP_FAILURE,
			payload: e.message,
		});
		throw e;
	}
};

export const logIn = (payload) => async (dispatch) => {
	try {
		dispatch({ type: actions.LOGIN_BEGIN });
		const { data } = await API.post('/auth/login', payload);
		dispatch({ type: actions.LOGIN_SUCCESS, payload: data });
	} catch (e) {
		dispatch({
			type: actions.LOGIN_FAILURE,
			payload: e.message,
		});
		throw e;
	}
};

export const logOut = () => ({
	type: actions.LOGOUT,
});

export const setUserData = (token) => ({
	type: actions.SET_USER,
	payload: {
		token,
		data: { ...jwt(token) },
	},
});

export const getUserPurchases = () => async (dispatch) => {
	try {
		dispatch({ type: actions.FETCH_PURCHASES_BEGIN });
		const purchases = await API.get('/user');
		dispatch({ type: actions.FETCH_PURCHASES_SUCCESS,
			payload: purchases.data });
	} catch (e) {
		dispatch({
			type: actions.FETCH_PURCHASES_FAILURE,
			payload: e.message,
		});
		throw e;
	}
}
