import React from "react";
import css from "./NotFound.module.css";
const NotFound = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.imgBlockWrapper}>
        <span className={css.number}>4</span>
        <div className={css.imgWrapper}>
          <img className={css.img} src="/images/not-found-img.png" alt="Cat" />
        </div>
        <span className={css.number}>4</span>
      </div>

      <p className={css.desc}>Ooops! This page not found :(</p>
      <button className={css.btn} type="button">
        To home page
      </button>
    </div>
  );
};

export default NotFound;
