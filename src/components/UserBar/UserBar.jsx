import React from "react";
import css from "./UserBar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserFullInfo } from "../../redux/users/selectors.js";
const UserBar = () => {
  const navigate = useNavigate();

  const userFullInfo = useSelector(selectUserFullInfo);
  const userName = userFullInfo?.name;
  const userAvatar = userFullInfo?.avatar;

  return (
    <div
      className={css.wrapper}
      onClick={() => {
        navigate("/profile");
      }}
    >
      {userAvatar ? (
        <img className={css.userAvatar} href={userAvatar} alt="Avatar" />
      ) : (
        <div className={css.userAvatar}>
          <svg className={css.iconUser} width="24" height="24">
            <use href="/public/images/icons.svg#icon-user"></use>
          </svg>
        </div>
      )}
      <p>{userName}</p>
    </div>
  );
};

export default UserBar;
