// Auth selectors
export const selectToken = (state) => state.users.token;
export const selectError = (state) => state.users.error;
export const selectLoading = (state) => state.users.loading;
export const selectIsLoggedIn = (state) => state.users.isLoggedIn;
export const selectUserFullInfo = (state) => state.users.userFullInfo;
