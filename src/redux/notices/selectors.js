export const selectError = (state) => state.notices.error;
export const selectLoadingNotices = (state) => state.notices.loading;
export const selectNotices = (state) => state.notices.notices;
export const selectCategories = (state) => state.notices.categories;
export const selectTotalPages = (state) => state.notices.data.totalPages;
export const selectNoticesPage = (state) => state.notices.data.page;
export const selectNoticesSex = (state) => state.notices.sex;
export const selectNoticesSpecies = (state) => state.notices.species;
