import React, { useState } from "react";
import css from "./NoticesItem.module.css";
import { formatDatePetsList } from "../../js.js";
import ModalNotice from "../ModalNotice/ModalNotice.jsx";
import {
  addFavoritesNotices,
  removeFavoritesNoticesById,
} from "../../redux/notices/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoritesNotices } from "../../redux/users/selectors.js";
import { fetchUserFullInfo } from "../../redux/users/operations.js";
const NoticesItem = ({ notice }) => {
  const dispatch = useDispatch();
  const [isOpenModalNotice, setIsOpenModalNotice] = useState(false);
  const favorites = useSelector(selectFavoritesNotices);
  const favoriteId = (fav) => fav._id === notice._id;
  const isFavorite = favorites?.some(favoriteId);
  const closeMoadalNotice = () => {
    setIsOpenModalNotice(false);
  };
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoritesNoticesById(notice._id));
      dispatch(fetchUserFullInfo());
    } else {
      dispatch(addFavoritesNotices(notice._id));
      dispatch(fetchUserFullInfo());
    }
  };
  return (
    <li className={css.card}>
      <img
        className={css.img}
        src={notice.imgURL}
        alt={notice.title ? notice.title : "Pet image"}
      />
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
        <p className={css.nameInfo}>
          Category <span className={css.nameInfoPart}>{notice.category}</span>
        </p>
      </div>
      <div className={css.wrapperDesc}>
        <p className={css.desc}>{notice.comment}</p>
        {notice.price && <p className={css.price}>${notice.price}</p>}
      </div>

      <div className={css.btnWrapper}>
        <button
          className={css.btnLearnMore}
          type="button"
          onClick={() => setIsOpenModalNotice(true)}
        >
          Learn more
        </button>
        <button type="button" className={css.btnHeart} onClick={toggleFavorite}>
          <svg
            className={isFavorite ? css.heartActive : css.heart}
            height="18"
            width="18"
          >
            <use href="/images/icons.svg#icon-heart"></use>
          </svg>
        </button>
        {isOpenModalNotice && (
          <ModalNotice
            notice={notice}
            onClose={closeMoadalNotice}
            isOpen={isOpenModalNotice}
          />
        )}
      </div>
    </li>
  );
};

export default NoticesItem;
