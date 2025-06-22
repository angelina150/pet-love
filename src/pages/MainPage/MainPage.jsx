import React from 'react';
import css from './MainPage.module.css';
import { useNavigate } from 'react-router-dom';
const MainPage = () => {
  const navigate = useNavigate();
  return (
    <section className={css.wrapper}>
      <picture>
        <source
          media="(min-width: 1280px)"
          srcSet="/images/mainImg/mainImg-desc.jpg 1x, /images/mainImg/mainImg-desc@2x.jpg 2x"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/mainImg/mainImg-tab.jpg 1x, /images/mainImg/mainImg-tab@2x.jpg 2x"
        />
        <source
          media="(min-width: 320px)"
          srcSet="/images/mainImg/mainImg-mob.jpg 1x, /images/mainImg/mainImg-mob@2x.jpg 2x"
        />
        <img
          className={css.img}
          src="/images/mainImg/mainImg-mob.jpg"
          alt="Main image"
        />
      </picture>
      <svg className={css.logo} onClick={() => navigate('/home')}>
        <use href="/images/icons.svg#icon-logo-main"></use>
      </svg>
    </section>
  );
};

export default MainPage;
