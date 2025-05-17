import React from "react";
import css from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1 || isNaN(totalPages)) {
    return null;
  }
  const generatePages = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...");
      } else if (currentPage >= totalPages - 2) {
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
      }
    }

    return pages;
  };
  const handlePageChange = (page) => {
    if (page !== currentPage && page !== "...") {
      setCurrentPage(page);
    }
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
            onClick={() => handlePageChange(page)}
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
