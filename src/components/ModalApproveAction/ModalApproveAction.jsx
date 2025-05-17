import React from "react";
import css from "./ModalApproveAction.module.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/users/operations.js";

Modal.setAppElement("#root");

const ModalApproveAction = ({ onClose, isOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      onAfterOpen={() => {
        document.body.style.overflow = "hidden";
      }}
      onAfterClose={() => {
        document.body.style.overflow = "auto";
      }}
    >
      <button type="button" className={css.btnClose} onClick={onClose}>
        <svg width="24" height="24" className={css.iconClose}>
          <use href="/images/icons.svg#icon-close"></use>
        </svg>
      </button>
      <img src="" alt="Log out illustration" className={css.image} />
      <h2 className={css.title}>Already leaving?</h2>
      <div className={css.actions}>
        <button onClick={handleLogout} type="button" className={css.btnYes}>
          Yes
        </button>
        <button onClick={onClose} type="button" className={css.btnCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalApproveAction;
