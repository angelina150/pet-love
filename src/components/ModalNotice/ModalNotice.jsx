import React from "react";
import Modal from "react-modal";
import css from "./ModalNotice.module.css";
import { formatDatePetsList } from "../../js.js";
Modal.setAppElement("#root");

const ModalNotice = ({ onClose, isOpen, notice }) => {
  return (
    <Modal
      overlayClassName={css.overlay}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
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
        <p className={css.category}>{notice.category}</p>
        <img
          className={css.img}
          src={notice.imgURL}
          alt={notice.title ? notice.title : "Pet image"}
        />
      </div>

      <div className={css.titleWrap}>
        <h3 className={css.title}>{notice.title}</h3>
        <div className={css.rating}>
          <svg height="16" width="16" className={css.iconStar}>
            <use href="/images/icons.svg#icon-star"></use>
          </svg>
          <span> {notice.popularity}</span>
        </div>
      </div>
      <div className={css.infoWrap}>
        <p className={css.nameInfo}>
          Name <span className={css.nameInfoPart}>{notice.name}</span>
        </p>
        <p className={css.nameInfo}>
          Birthday
          <span className={css.nameInfoPart}>
            {formatDatePetsList(notice.birthday)}
          </span>
        </p>
        <p className={css.nameInfo}>
          Sex <span className={css.nameInfoPart}>{notice.sex}</span>
        </p>
        <p className={css.nameInfo}>
          Species <span className={css.nameInfoPart}>{notice.species}</span>
        </p>
      </div>
      <div className={css.wrapperDesc}>
        <p className={css.desc}>{notice.comment}</p>
        {notice.price && <p className={css.price}>${notice.price}</p>}
      </div>
      <div className={css.wrapperBtns}>
        <button className={css.btnAdd} type="button">
          Add to
          <svg height="18" width="18">
            <use
              className={css.heartIcon}
              href="/images/icons.svg#icon-heart"
            ></use>
          </svg>
        </button>
        <button type="button" className={css.btnContact}>
          Contact
        </button>
      </div>
    </Modal>
  );
};

export default ModalNotice;
