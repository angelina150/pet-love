import React, { useState } from "react";
import css from "./Header.module.css";
import Nav from "../Nav/Nav.jsx";
import UserNav from "../UserNav/UserNav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/users/selectors.js";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const closeModal = () => setIsMenuOpen(false);
  const isHome = location.pathname === "/home";
  return (
    <header className={isHome ? css.headerHome : css.headerDefault}>
      <Link className={css.logo} to="/home">
        {isHome ? (
          <svg className={css.iconLogo} width="105" height="28">
            <use href="/images/icons.svg#icon-logo-header-home"></use>
          </svg>
        ) : (
          <svg className={css.iconLogo} width="105" height="28">
            <use href="/images/icons.svg#icon-logo-header"></use>
          </svg>
        )}
      </Link>
      <Nav
        isLoggedIn={isLoggedIn}
        isHome={isHome}
        isMenuOpen={isMenuOpen}
        closeModal={closeModal}
      />
      <div className={css.authDesktop}>
        {isLoggedIn ? <UserNav isHome={isHome} /> : <AuthNav />}
      </div>
      <button
        className={`${css.burger} ${isHome ? css.burgerHome : ""}`.trim()}
        onClick={toggleMenu}
      >
        <svg className={css.iconBurger} width="28" height="28">
          <use href="/images/icons.svg#icon-menu"></use>
        </svg>
      </button>

      {isMenuOpen && <div className={css.backdrop} onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
