import React from 'react';
import css from './SearchField.module.css';
import { toast } from 'react-toastify';
const SearchField = ({ onSearch, searchQuery, setSearchQuery, pageType }) => {
  const handleSearch = e => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery === '') {
      toast.warn('Please enter a search query!');
      return;
    }
    onSearch(trimmedQuery);
  };
  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`${css.form} ${pageType === 'notices' ? css.formNotices : ''}`}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className={`${css.wrapper} ${
          pageType === 'notices' ? css.inputNotices : css.input
        }`}
      />

      {searchQuery && (
        <button
          className={css.btnClear}
          type="button"
          onClick={clearSearch}
          title="Clear"
        >
          <svg className={css.iconClear} width="18" height="18">
            <use href="/images/icons.svg#icon-close"></use>
          </svg>
        </button>
      )}

      <button className={css.btnSearch} type="submit" title="Search">
        <svg className={css.iconSearch}>
          <use href="/images/icons.svg#icon-search"></use>
        </svg>
      </button>
    </form>
  );
};

export default SearchField;
