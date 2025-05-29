import React from "react";
import css from "./Pagination.module.css";
import useWindowWidth from "../../utils.js";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const width = useWindowWidth();

  if (!totalPages || totalPages <= 1 || isNaN(totalPages)) {
    return null;
  }

  const visiblePages = width <= 375 ? 1 : width <= 768 ? 2 : 3;

  const generatePages = () => {
    const pages = [];

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= visiblePages) {
      for (let i = 1; i <= visiblePages; i++) {
        pages.push(i);
      }

      pages.push("...");
    } else if (currentPage >= totalPages - visiblePages + 1) {
      pages.push("...");
      for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (visiblePages > 1) pages.push("...");
      pages.push(currentPage);
      if (visiblePages > 2) pages.push(currentPage + 1);
      pages.push("...");
    }

    return pages;
  };

  const pages = generatePages();

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

  return (
    <div className={css.wrapper}>
      <div className={css.btnWrap}>
        <button
          onClick={handleFirst}
          className={`${css.btn} ${currentPage === 1 ? css.noActive : ""}`}
          disabled={currentPage === 1}
        >
          <svg className={css.icon}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
          <svg className={css.iconSecond}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
        <button
          onClick={handlePrev}
          className={`${css.btn} ${currentPage === 1 ? css.noActive : ""}`}
          disabled={currentPage === 1}
        >
          <svg className={css.iconSolo}>
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
          <svg className={css.iconSoloRight}>
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
          <svg className={css.iconRight}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
          <svg className={css.iconRightSecond}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
