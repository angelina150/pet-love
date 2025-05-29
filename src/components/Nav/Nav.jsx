import React from "react";
import css from "./Nav.module.css";
import { NavLink } from "react-router-dom";
const Nav = ({ isHome, isMenuOpen }) => {
  return (
    <>
      <nav className={isMenuOpen ? css.navWrapperOpen : css.navWrapper}>
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
      </nav>
    </>
  );
};

export default Nav;
