import React from 'react';
import css from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={css.wrapper}>
      <div className={css.imgBlockWrapper}>
        <span className={css.number}>4</span>
        <div className={css.imgWrapper}>
          <img
            className={css.img}
            loading="lazy"
            src="/images/not-found-img.png"
            alt="Cat"
          />
        </div>
        <span className={css.number}>4</span>
      </div>

      <p className={css.desc}>Ooops! This page not found :(</p>
      <button
        className={css.btn}
        type="button"
        onClick={() => navigate('/home')}
      >
        To home page
      </button>
    </div>
  );
};

export default NotFound;
