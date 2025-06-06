import React from "react";
import css from "./ModalApproveAction.module.css";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/users/operations.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const ModalApproveAction = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      toast.error(error || "Logout failed");
    } finally {
      localStorage.removeItem("persist:root");
      onClose();
      navigate("/");
    }
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
      <div className={css.imgWrapper}>
        <img
          className={css.img}
          src="/images/cat.png"
          alt="Log out illustration"
        />
      </div>
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
