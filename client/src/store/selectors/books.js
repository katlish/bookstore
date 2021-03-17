import { createSelector } from 'reselect';

const getBooks = (state) => state.books.data;
const getQuery = (state) => state.books.searchQuery;

export const selectVisibleBooks = createSelector(getBooks,getQuery, (books, query) => {
	return books.filter((book) => {
		const title = book.title.toLowerCase();
		return (!book.deleted && title.includes(query.toLowerCase())) ? true : false;
	})
});
