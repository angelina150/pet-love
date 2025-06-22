import React from 'react';
import css from './LogOutBtn.module.css';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction.jsx';

const LogOutBtn = ({ className, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${css.btn} ${className === 'burger' ? css.burger : ''}`}
    >
      Log out
    </button>
  );
};

export default LogOutBtn;
