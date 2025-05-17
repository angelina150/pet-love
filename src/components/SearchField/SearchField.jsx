import React from "react";
import css from "./SearchField.module.css";

const SearchField = ({ onSearch, searchQuery, setSearchQuery, pageType }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSearch} className={css.form}>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`${css.wrapper} ${
          pageType === "notices" ? css.inputNotices : css.input
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
        <svg className={css.iconSearch} width="20" height="20">
          <use href="/images/icons.svg#icon-search"></use>
        </svg>
      </button>
    </form>
  );
};

export default SearchField;
