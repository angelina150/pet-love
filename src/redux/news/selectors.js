export const selectNews = (state) => state.news.news;
export const selectNewsLoading = (state) => state.news.loading;
export const selectNewsError = (state) => state.news.error;
export const selectNewsTotalPages = (state) => state.news.data.totalPages;
export const selectNewsPage = (state) => state.news.data.page;
