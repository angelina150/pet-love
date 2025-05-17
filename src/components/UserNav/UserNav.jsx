import React from "react";
import UserBar from "../UserBar/UserBar.jsx";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";
import css from "./UserNav.module.css";
const UserNav = ({ isHome }) => {
  return (
    <div className={css.wrapper}>
      {!isHome && <LogOutBtn />}
      <UserBar isHome={isHome} />
    </div>
  );
};

export default UserNav;
