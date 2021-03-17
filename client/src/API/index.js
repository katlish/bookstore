import axios from 'axios';

const API = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	timeout: process.env.REACT_APP_API_URL,
	responseType: 'json',
});

API.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		if (error.response.status === 401) {
			localStorage.removeItem('token');
		}
		return Promise.reject(error);
	},
);

export default API;
