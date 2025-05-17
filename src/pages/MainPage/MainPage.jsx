import React from "react";
import css from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className={css.wrapper}>
      <img
        className={css.img}
        src="/images/mainImg/mainImg.jpg"
        alt="Main image"
      />
      <svg className={css.logo} onClick={() => navigate("/home")}>
        <use href="/images/icons.svg#icon-logo-main"></use>
      </svg>
    </div>
  );
};

export default MainPage;
