import * as actions from './constants';
import API from '../../API';

export const fetchPublishers = () => async (dispatch) => {
	try {
		dispatch({ type: actions.FETCH_PUBLISHERS_BEGIN });
		const { data } = await API.get('/publishers');
		dispatch({ type: actions.FETCH_PUBLISHERS_SUCCESS, payload: data });
	} catch (e) {
		dispatch({
			type: actions.FETCH_PUBLISHERS_FAILURE,
			payload: e.message,
		});
		throw e;
	}
};

export const fetchAuthors = () => async (dispatch) => {
	try {
		dispatch({ type: actions.FETCH_AUTHORS_BEGIN });
		const { data } = await API.get('/authors');
		dispatch({ type: actions.FETCH_AUTHORS_SUCCESS, payload: data });
	} catch (e) {
		dispatch({
			type: actions.FETCH_AUTHORS_FAILURE,
			payload: e.message,
		});
		throw e;
	}
};
