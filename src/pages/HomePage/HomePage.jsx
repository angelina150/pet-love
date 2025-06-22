import React from 'react';
import css from './HomePage.module.css';
const HomePage = () => {
  return (
    <section className={css.wrapper}>
      <div className={css.container}>
        <div className={css.titleWrapper}>
          <h1 className={css.title}>
            Take good <span className={css.titlePath}>care</span> of your small
            pets
          </h1>
          <p className={css.desc}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
      </div>
      <picture>
        <source
          className={css.img}
          media="(min-width: 1280px)"
          srcSet="/images/home/home-desktop.jpg 1x, /images/home/home-desktop@2x.png 2x"
        />
        <source
          className={css.img}
          media="(min-width: 768px)"
          srcSet="/images/home/home-tab.jpg 1x, /images/home/home-tab@2x.png 2x"
        />
        <source
          className={css.img}
          media="(min-width: 320px)"
          srcSet="/images/home/home-mob.jpg 1x, /images/home/home-mob@2x.png 2x"
        />
        <img
          loading="lazy"
          className={css.img}
          src="/images/home/home-mob.jpg"
          alt="Girl and dog"
        />
      </picture>
    </section>
  );
};

export default HomePage;
