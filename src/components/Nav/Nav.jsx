import React from 'react';
import css from './Nav.module.css';
import { NavLink } from 'react-router-dom';
const Nav = ({ isHome, variant = 'default', onClose }) => {
  const isBurger = variant === 'burger';

  const getLinkClass = isActive => {
    if (isHome && isBurger) return css.linkHomeBurger;
    if (isHome) return css.linkHome;
    if (isBurger) return css.linkBurger;
    return `${css.link} ${isActive ? css.active : ''}`.trim();
  };
  return (
    <nav
      aria-label="Main navigation"
      className={
        isBurger
          ? isHome
            ? css.navWrapperOpenHome
            : css.navWrapperOpen
          : css.navWrapper
      }
    >
      <NavLink
        onClick={onClose}
        to="/news"
        className={({ isActive }) => getLinkClass(isActive)}
      >
        News
      </NavLink>
      <NavLink
        onClick={onClose}
        to="/notices"
        className={({ isActive }) => getLinkClass(isActive)}
      >
        Find pet
      </NavLink>
      <NavLink
        onClick={onClose}
        to="/friends"
        className={({ isActive }) => getLinkClass(isActive)}
      >
        Our friends
      </NavLink>
    </nav>
  );
};

export default Nav;
