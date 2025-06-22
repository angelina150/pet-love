import React from 'react';
import css from './AuthNav.module.css';
import { useNavigate } from 'react-router-dom';
const AuthNav = ({ className, isHome }) => {
  const navigate = useNavigate();
  return (
    <nav
      aria-label="Authentication navigation"
      className={`${css.wrapper} ${
        className === 'header' && css.wrapperHeader
      }`}
    >
      <button
        type="button"
        className={`${css.btnLogin} ${isHome && css.btnLoginHome} ${
          className === 'header'
            ? isHome
              ? css.btnLoginHeaderHome
              : css.btnLoginHeader
            : ''
        }`}
        onClick={() => {
          navigate('/login');
        }}
      >
        Log in
      </button>
      <button
        type="button"
        className={css.btnRegister}
        onClick={() => {
          navigate('/register');
        }}
      >
        Registration
      </button>
    </nav>
  );
};

export default AuthNav;
