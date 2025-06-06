import React from "react";
import UserBar from "../UserBar/UserBar.jsx";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";
import css from "./UserNav.module.css";
const UserNav = ({ isHome, onLogOutClick }) => {
  return (
    <div className={css.wrapper}>
      {!isHome && (
        <LogOutBtn onClick={() => onLogOutClick()} className="visible" />
      )}
      <UserBar isHome={isHome} />
    </div>
  );
};

export default UserNav;
