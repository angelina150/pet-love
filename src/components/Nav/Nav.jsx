import React, { useState } from "react";
import css from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import UserNav from "../UserNav/UserNav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
const Nav = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHome = location.pathname === "/home";
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const closeModal = () => setIsMenuOpen(false);
  return (
    <>
      <button className={css.burger} onClick={toggleMenu}>
        <svg className={css.iconBurger} width="28" height="28">
          <use href="/images/icons.svg#icon-menu"></use>
        </svg>
      </button>

      {isMenuOpen && <div className={css.backdrop} onClick={toggleMenu}></div>}

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
