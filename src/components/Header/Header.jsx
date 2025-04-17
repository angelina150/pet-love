import React from "react";
import css from "./Header.module.css";
import Nav from "../Nav/Nav.jsx";
import UserNav from "../UserNav/UserNav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";

const Header = ({ isLoggedIn }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.logo}>
        <svg className={css.iconLogo} width="105" height="28">
          <use href="/images/icons.svg#icon-logo-header"></use>
        </svg>
      </div>
      <Nav />
      {isLoggedIn ? <UserNav /> : <AuthNav />}
    </div>
  );
};

export default Header;
