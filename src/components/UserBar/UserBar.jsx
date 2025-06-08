import React from 'react';
import css from './UserBar.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserFullInfo } from '../../redux/users/selectors.js';
const UserBar = ({ isHome }) => {
  const navigate = useNavigate();

  const userFullInfo = useSelector(selectUserFullInfo);
  const userName = userFullInfo?.name;
  const userAvatar = userFullInfo?.avatar;
  return (
    <div
      className={css.wrapper}
      onClick={() => {
        navigate('/profile');
      }}
    >
      {userAvatar ? (
        <img
          loading="lazy"
          className={css.userAvatar}
          src={userAvatar}
          alt="Avatar"
        />
      ) : (
        <div className={css.userAvatarSvg}>
          <svg className={css.iconUser}>
            <use href="/images/icons.svg#icon-user"></use>
          </svg>
        </div>
      )}
      <p className={`${css.name} ${isHome && css.nameHome}`}>{userName}</p>
    </div>
  );
};

export default UserBar;
