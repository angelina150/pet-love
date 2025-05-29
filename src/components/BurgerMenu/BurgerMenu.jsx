import React from "react";
import css from "./BurgerMenu.module.css";
import Nav from "../Nav/Nav.jsx";
import UserNav from "../UserNav/UserNav.jsx";
const BurgerMenu = ({ onClose, isHome }) => {
  return (
    <div className={`${css.wrapper} ${isHome ? css.wrapperHome : ""}`}>
      <button onClick={onClose} type="button" className={css.btnClose}>
        <svg className={css.iconClose}>
          <use href="/public/images/icons.svg#icon-close"></use>
        </svg>
      </button>
      <Nav />
      <UserNav />
    </div>
  );
};

export default BurgerMenu;
