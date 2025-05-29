import React from "react";
import css from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages === null || totalPages <= 1 || isNaN(totalPages)) {
    return null;
  }
  const generatePages = () => {
    const isMobile = window.innerWidth <= 768;
    const pages = [];

    const visiblePages = isMobile ? 2 : 3;

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= visiblePages) {
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
        pages.push("...");
        if (!isMobile) pages.push(currentPage - 1);
        pages.push(currentPage);
        if (!isMobile) pages.push(currentPage + 1);
        pages.push("...");
      }
    }
    return pages;
  };

  const handlePageChange = (page) => {
    try {
      if (page !== currentPage && page !== "...") {
        setCurrentPage(page);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFirst = () => {
    try {
      if (currentPage !== 1) setCurrentPage(1);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrev = () => {
    try {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    try {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLast = () => {
    try {
      if (currentPage !== totalPages) setCurrentPage(totalPages);
    } catch (error) {
      console.error(error);
    }
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
          <svg className={css.icon}>
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
          <svg className={`${css.iconRight} ${css.iconRightSecond}`}>
            <use href="/images/icons.svg#icon-angle"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
