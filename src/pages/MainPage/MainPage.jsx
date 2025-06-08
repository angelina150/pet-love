import React from 'react';
import css from './MainPage.module.css';
import { useNavigate } from 'react-router-dom';
const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className={css.wrapper}>
      <picture>
        <source
          className={css.img}
          media="(min-width: 1280px)"
          srcSet="/images/mainImg/mainImg-desc.jpg 1x, /images/mainImg/mainImg-desc@2x.jpg 2x"
        />
        <source
          className={css.img}
          media="(min-width: 768px)"
          srcSet="/images/mainImg/mainImg-tab.jpg 1x, /images/mainImg/mainImg-tab@2x.jpg 2x"
        />
        <source
          className={css.img}
          media="(min-width: 320px)"
          srcSet="/images/mainImg/mainImg-mob.jpg 1x, /images/mainImg/mainImg-mob@2x.jpg 2x"
        />
        <img
          loading="lazy"
          className={css.img}
          src="/images/mainImg/mainImg-tab.jpg"
          alt="Main image"
        />
      </picture>
      <svg className={css.logo} onClick={() => navigate('/home')}>
        <use href="/images/icons.svg#icon-logo-main"></use>
      </svg>
    </div>
  );
};

export default MainPage;
