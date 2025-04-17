import React, { useState } from "react";
import css from "./Nav.module.css";
import { NavLink } from "react-router-dom";
const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          News
        </NavLink>
        <NavLink
          to="/notices"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          Find pet
        </NavLink>
        <NavLink
          to="/friends"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          Our friends
        </NavLink>
      </nav>
    </>
  );
};

export default Nav;
