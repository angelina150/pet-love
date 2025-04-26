import React from "react";
import css from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) {
    return null;
  }

  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...");
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const handleFirst = () => {
    if (currentPage !== 1) setCurrentPage(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleLast = () => {
    if (currentPage !== totalPages) setCurrentPage(totalPages);
  };

  const pages = generatePages();

  return (
    <div className={css.wrapper}>
      <div className={css.btnWrap}>
        <button
          onClick={handleFirst}
          className={`${css.btn} ${currentPage === 1 ? css.noActive : ""}`}
          disabled={currentPage === 1}
        >
          <svg width="24" height="24" className={css.icon}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
          <svg
            width="24"
            height="24"
            className={`${css.icon} ${css.iconSecond}`}
          >
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
        <button
          onClick={handlePrev}
          className={`${css.btn} ${currentPage === 1 ? css.noActive : ""}`}
          disabled={currentPage === 1}
        >
          <svg width="24" height="24" className={css.icon}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
      </div>

      <ul className={css.pages}>
        {pages.map((page, index) => (
          <li
            key={index}
            className={`${css.pageItem} ${
              page === currentPage ? css.active : ""
            } ${page === "..." ? css.dots : ""}`}
            onClick={() => {
              if (page !== "...") setCurrentPage(page);
            }}
          >
            {page}
          </li>
        ))}
      </ul>

      <div className={css.btnWrap}>
        <button
          onClick={handleNext}
          className={`${css.btn} ${
            currentPage === totalPages ? css.noActive : ""
          }`}
          disabled={currentPage === totalPages}
        >
          <svg width="24" height="24" className={css.iconRight}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
        <button
          onClick={handleLast}
          className={`${css.btn} ${
            currentPage === totalPages ? css.noActive : ""
          }`}
          disabled={currentPage === totalPages}
        >
          <svg width="24" height="24" className={css.iconRight}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
          <svg
            width="24"
            height="24"
            className={`${css.iconRight} ${css.iconRightSecond}`}
          >
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
