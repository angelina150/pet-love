import React from "react";
import { useSelector } from "react-redux";
import { selectNewsTotalPages } from "../../redux/news/selectors.js";
import css from "./Pagination.module.css";
const Pagination = () => {
  const totalPages = useSelector(selectNewsTotalPages);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className={css.wrapper}>
      <div>
        <button className={css.btn}>
          <svg width="24" height="24" className={css.icon}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
          <svg width="24" height="24" className={css.icon}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
        <button className={css.btn}>
          <svg width="24" height="24" className={css.icon}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
      </div>
      <div>
        <button className={css.btn}>
          <svg width="24" height="24" className={css.iconRight}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
        <button className={css.btn}>
          <svg width="24" height="24" className={css.iconRight}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
          <svg width="24" height="24" className={css.iconRight}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
