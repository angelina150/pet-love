import React from "react";
import css from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import UserNav from "../UserNav/UserNav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
const Nav = ({ isLoggedIn, isHome, isMenuOpen, closeModal }) => {
  return (
    <>
      <nav className={isMenuOpen ? css.navWrapperOpen : css.navWrapper}>
        <button className={css.btnClose} onClick={closeModal}>
          <svg className={css.iconClose} width="28" height="28">
            <use href="/images/icons.svg#icon-close"></use>
          </svg>
        </button>

        <NavLink
          to="/news"
          className={({ isActive }) =>
            isHome
              ? css.linkHome
              : `${css.link} ${isActive ? css.active : ""}`.trim()
          }
        >
          News
        </NavLink>
        <NavLink
          to="/notices"
          className={({ isActive }) =>
            isHome
              ? css.linkHome
              : `${css.link} ${isActive ? css.active : ""}`.trim()
          }
        >
          Find pet
        </NavLink>
        <NavLink
          to="/friends"
          className={({ isActive }) =>
            isHome
              ? css.linkHome
              : `${css.link} ${isActive ? css.active : ""}`.trim()
          }
        >
          Our friends
        </NavLink>
        <div className={css.authMobile}>
          {isLoggedIn ? <UserNav /> : <AuthNav />}
        </div>
      </nav>
    </>
  );
};

export default Nav;
