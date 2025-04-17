import React from "react";
import css from "./Header.module.css";
import Nav from "../Nav/Nav.jsx";
import UserNav from "../UserNav/UserNav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { Link, useLocation } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
  const location = useLocation();

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
      <Nav />
      {isLoggedIn ? <UserNav /> : <AuthNav />}
    </header>
  );
};

export default Header;
