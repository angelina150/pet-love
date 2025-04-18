import React from "react";
import css from "./HomePage.module.css";
const HomePage = () => {
  return (
    <div>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>
          Take good <span className={css.titlePath}>care</span> of your small
          pets
        </h1>
        <p className={css.desc}>
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>
      <img
        className={css.img}
        src="./images/hero/hero.jpg"
        srcSet=" ./images/hero/hero.jpg 1x, ./images/hero/hero@2x.jpg 2x"
        alt="Girl and dog"
      />
    </div>
  );
};

export default HomePage;
