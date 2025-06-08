import React, { useEffect, useRef } from 'react';
import css from './BurgerMenu.module.css';
import Nav from '../Nav/Nav.jsx';
import AuthNav from '../AuthNav/AuthNav.jsx';
import LogOutBtn from '../LogOutBtn/LogOutBtn.jsx';
const BurgerMenu = ({ onClose, isHome, isLoggedIn, onLogOutClick }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div
      ref={menuRef}
      className={`${css.wrapper} ${isHome ? css.wrapperHome : ''}`}
    >
      <button onClick={onClose} type="button" className={css.btnClose}>
        <svg className={`${css.iconClose} ${isHome ? css.iconCloseHome : ''}`}>
          <use href="/images/icons.svg#icon-close"></use>
        </svg>
      </button>
      <Nav variant="burger" isHome={isHome} onClose={onClose} />
      {isLoggedIn ? (
        <LogOutBtn
          onClick={() => {
            onClose();
            setTimeout(() => onLogOutClick(), 0);
          }}
          className="burger"
          isHome={isHome}
          onClose={onClose}
        />
      ) : (
        <AuthNav isHome={isHome} />
      )}
    </div>
  );
};

export default BurgerMenu;
