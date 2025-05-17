import React from "react";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.loader}>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
