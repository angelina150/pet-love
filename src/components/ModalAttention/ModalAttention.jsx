import React from 'react';
import Modal from 'react-modal';
import css from './ModalAttention.module.css';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const ModalAttention = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      onAfterOpen={() => {
        document.body.style.overflow = 'hidden';
      }}
      onAfterClose={() => {
        document.body.style.overflow = 'auto';
      }}
    >
      <button type="button" className={css.btnClose} onClick={onClose}>
        <svg width="24" height="24" className={css.iconClose}>
          <use href="/images/icons.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.imgWrapper}>
        <img
          className={css.img}
          src="/images/dog.png"
          alt="Dog"
          loading="lazy"
        />
      </div>
      <h2 className={css.title}>Attention</h2>
      <p className={css.desc}>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>
      <div className={css.btnsWrapper}>
        <button
          className={css.btnLogin}
          onClick={() => {
            navigate('/login');
          }}
        >
          Log In
        </button>
        <button
          className={css.btnRegister}
          onClick={() => {
            navigate('/register');
          }}
        >
          Registration
        </button>
      </div>
    </Modal>
  );
};

export default ModalAttention;
