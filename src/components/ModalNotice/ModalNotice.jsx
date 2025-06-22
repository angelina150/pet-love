import React, { useEffect } from 'react';
import Modal from 'react-modal';
import css from './ModalNotice.module.css';
import { formatDatePetsList } from '../../utils.js';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNoticeById } from '../../redux/notices/operations.js';
import { selectNoticeById } from '../../redux/notices/selectors.js';
Modal.setAppElement('#root');

const ModalNotice = ({
  onClose,
  isOpen,
  notice,
  handleHeartClick,
  isFavorite,
}) => {
  const dispatch = useDispatch();
  const noticeUser = useSelector(selectNoticeById);

  const noticeUserEmail = noticeUser?.user?.email;

  useEffect(() => {
    dispatch(fetchNoticeById(notice._id));
  }, [dispatch, notice]);
  return (
    <Modal
      overlayClassName={css.overlay}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterOpen={() => {
        document.body.style.overflow = 'hidden';
      }}
      onAfterClose={() => {
        document.body.style.overflow = 'auto';
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className={css.btnClose}
        onClick={onClose}
        aria-label="Close modal"
      >
        <svg width="24" height="24" className={css.iconClose}>
          <use href="/images/icons.svg#icon-close"></use>
        </svg>
      </button>

      <div className={css.imgWrapper}>
        <p className={css.category}>{notice.category}</p>
        <img
          loading="lazy"
          className={css.img}
          src={notice.imgURL}
          alt={notice.title ? notice.title : 'Pet image'}
        />
      </div>

      <div className={css.titleWrap}>
        <h3 id="modal-title" className={css.title}>
          {notice.title}
        </h3>
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

      <div
        className={`${css.wrapperBtns} ${
          isFavorite ? css.wrapperBtnsActive : ''
        }`}
      >
        <button onClick={handleHeartClick} className={css.btnAdd} type="button">
          {isFavorite ? 'Remove from' : 'Add to'}
          <svg height="18" width="18">
            <use
              className={isFavorite ? css.heartIconActive : css.heartIcon}
              href="/images/icons.svg#icon-heart"
            ></use>
          </svg>
        </button>
        <button
          type="button"
          className={css.btnContact}
          onClick={() => {
            if (noticeUserEmail) {
              window.location.href = `mailto:${noticeUserEmail}`;
            }
          }}
        >
          Contact
        </button>
      </div>
    </Modal>
  );
};

export default ModalNotice;
