import React, { useState } from "react";
import css from "./NoticesItem.module.css";
import { formatDatePetsList } from "../../utils.js";
import ModalNotice from "../ModalNotice/ModalNotice.jsx";
import {
  addFavoritesNotices,
  removeFavoritesNoticesById,
} from "../../redux/notices/operations.js";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavoritesNotices,
  selectIsLoggedIn,
} from "../../redux/users/selectors.js";
import { fetchUserFullInfo } from "../../redux/users/operations.js";
import ModalAttention from "../ModalAttention/ModalAttention.jsx";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const NoticesItem = ({ notice }) => {
  const location = useLocation();
  const isProfile = location.pathname === "/profile";
  const dispatch = useDispatch();
  const [showModalAttention, setShowModalAttention] = useState(false);
  const [isOpenModalNotice, setIsOpenModalNotice] = useState(false);
  const isLoggenIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavoritesNotices);
  const favoriteId = (fav) => fav._id === notice._id;
  const isFavorite = favorites?.some(favoriteId);
  function removeExtraSpaces(str) {
    return str.trim();
  }
  const closeModalNotice = () => {
    setIsOpenModalNotice(false);
  };
  const closeModalAttention = () => {
    setShowModalAttention(false);
  };
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await dispatch(removeFavoritesNoticesById(notice._id)).unwrap();
      } else {
        await dispatch(addFavoritesNotices(notice._id)).unwrap();
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      try {
        await dispatch(fetchUserFullInfo()).unwrap();
      } catch (fetchError) {
        console.error("Error updating user information:", fetchError);
      }
    }
  };

  const handleHeartClick = () => {
    if (isLoggenIn) {
      toggleFavorite();
    } else {
      setShowModalAttention(true);
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
        <p className={css.desc}>{removeExtraSpaces(notice.comment)}</p>
        {notice.price && <p className={css.price}>${notice.price}</p>}
      </div>

      <div className={css.btnWrapper}>
        <button
          className={css.btnLearnMore}
          type="button"
          onClick={
            isLoggenIn
              ? () => setIsOpenModalNotice(true)
              : () => setShowModalAttention(true)
          }
        >
          Learn more
        </button>
        {isProfile ? (
          <button
            type="button"
            className={css.btnTrash}
            onClick={() => toggleFavorite()}
          >
            <svg className={css.trash} height="18" width="18">
              <use href="/images/icons.svg#icon-trash"></use>
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className={css.btnHeart}
            onClick={handleHeartClick}
          >
            <svg
              className={isFavorite ? css.heartActive : css.heart}
              height="18"
              width="18"
            >
              <use href="/images/icons.svg#icon-heart"></use>
            </svg>
          </button>
        )}

        {isOpenModalNotice && (
          <ModalNotice
            notice={notice}
            onClose={closeModalNotice}
            isOpen={isOpenModalNotice}
            handleHeartClick={handleHeartClick}
            isFavorite={isFavorite}
          />
        )}
        {showModalAttention && (
          <ModalAttention
            isOpen={showModalAttention}
            onClose={closeModalAttention}
            notice={notice}
          />
        )}
      </div>
    </li>
  );
};

export default NoticesItem;
