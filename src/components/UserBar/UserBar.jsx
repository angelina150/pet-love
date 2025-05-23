import React from "react";
import css from "./UserBar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserFullInfo } from "../../redux/users/selectors.js";
const UserBar = ({ isHome }) => {
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
        <img className={css.userAvatar} src={userAvatar} alt="Avatar" />
      ) : (
        <div className={css.userAvatarSvg}>
          <svg className={css.iconUser} width="24" height="24">
            <use href="/images/icons.svg#icon-user"></use>
          </svg>
        </div>
      )}
      <p className={isHome ? css.nameHome : css.name}>{userName}</p>
    </div>
  );
};

export default UserBar;
