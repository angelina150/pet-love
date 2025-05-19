export const selectToken = (state) => state.users.token;
export const selectErrorUsers = (state) => state.users.error;
export const selectLoading = (state) => state.users.loading;
export const selectUserData = (state) => state.users.data;
export const selectIsLoggedIn = (state) => state.users.isLoggedIn;
export const selectUserFullInfo = (state) => state.users.userFullInfo;
export const selectUserInfo = (state) => state.users.userInfo;
export const selectUserNotices = (state) =>
  state.users.userFullInfo.noticesViewed;
export const selectUserPets = (state) => state.users.userFullInfo.pets;
export const selectFavoritesNotices = (state) =>
  state.users.userFullInfo.noticesFavorites;
export const selectViewedNotices = (state) =>
  state.users.userFullInfo.noticesViewed;
