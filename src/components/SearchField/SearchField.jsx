import React from "react";
import css from "./SearchField.module.css";

const SearchField = ({ onSearch, searchQuery, setSearchQuery }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim()); // Call parent's handler on submit
  };

  const clearSearch = () => {
    setSearchQuery(""); // Reset local search query
    onSearch(""); // Call parent's handler to reset search
  };

  return (
    <form onSubmit={handleSearch} className={css.form}>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Local update of search query
        className={css.input}
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
        <svg className={css.iconSearch} width="20" height="20">
          <use href="/images/icons.svg#icon-search"></use>
        </svg>
      </button>
    </form>
  );
};

export default SearchField;
