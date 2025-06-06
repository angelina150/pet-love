import React, { useEffect, useState } from "react";
import css from "./Header.module.css";
import Nav from "../Nav/Nav.jsx";
import UserNav from "../UserNav/UserNav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/users/selectors.js";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction.jsx";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalApproveAction, setIsModalApproveAction] = useState(false);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location?.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const isHome = location?.pathname === "/home";

  if (!location) {
    return null;
  }

  return (
    <header className={isHome ? css.headerHome : css.headerDefault}>
      <Link className={css.logo} to="/home">
        <svg className={css.iconLogo}>
          <use
            href={`/images/icons.svg#icon-logo-header${isHome ? "-home" : ""}`}
          ></use>
        </svg>
      </Link>
      <Nav
        isLoggedIn={isLoggedIn}
        isHome={isHome}
        isMenuOpen={isMenuOpen}
        closeModal={() => setIsMenuOpen(false)}
      />
      <div className={css.auth}>
        {isLoggedIn ? (
          <UserNav
            onLogOutClick={() => setIsModalApproveAction(true)}
            isHome={isHome}
          />
        ) : (
          <AuthNav className="header" isHome={isHome} />
        )}
      </div>
      <button
        className={`${css.burger} ${isHome ? css.burgerHome : ""}`.trim()}
        onClick={toggleMenu}
      >
        <svg className={css.iconBurger}>
          <use href="/images/icons.svg#icon-menu"></use>
        </svg>
      </button>
      {isMenuOpen && (
        <BurgerMenu
          isMenuOpen={isMenuOpen}
          isHome={isHome}
          onClose={() => setIsMenuOpen(false)}
          isLoggedIn={isLoggedIn}
          onLogOutClick={() => setIsModalApproveAction(true)}
        />
      )}
      {isModalApproveAction && (
        <ModalApproveAction
          isOpen={isModalApproveAction}
          onClose={() => setIsModalApproveAction(false)}
        />
      )}
    </header>
  );
};

export default Header;
