import React, { useState } from 'react';
import css from './NoticesItem.module.css';
import { formatDatePetsList } from '../../utils.js';
import ModalNotice from '../ModalNotice/ModalNotice.jsx';
import {
  addFavoritesNotices,
  removeFavoritesNoticesById,
} from '../../redux/notices/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavoritesNotices,
  selectIsLoggedIn,
} from '../../redux/users/selectors.js';
import { fetchUserFullInfo } from '../../redux/users/operations.js';
import ModalAttention from '../ModalAttention/ModalAttention.jsx';
import { toast } from 'react-toastify';
const NoticesItem = ({ notice, className }) => {
  const dispatch = useDispatch();
  const [showModalAttention, setShowModalAttention] = useState(false);
  const [isOpenModalNotice, setIsOpenModalNotice] = useState(false);
  const isLoggenIn = useSelector(selectIsLoggedIn);
  const favorites = useSelector(selectFavoritesNotices);
  const favoriteId = fav => fav._id === notice._id;
  const isFavorite = favorites?.some(favoriteId);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
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
    setIsFavoriteLoading(true);
    try {
      if (isFavorite) {
        await dispatch(removeFavoritesNoticesById(notice._id)).unwrap();
      } else {
        await dispatch(addFavoritesNotices(notice._id)).unwrap();
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setIsFavoriteLoading(false);
      dispatch(fetchUserFullInfo()).catch(err =>
        console.error('User info update failed:', err)
      );
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
    <li
      className={`${css.card} ${
        className === 'listNoticesUserFav' ||
        className === 'listNoticesUserViewed'
          ? css.cardFav
          : ''
      }`}
    >
      <div className={css.topWrapper}>
        <img
          loading="lazy"
          className={`${css.img} ${
            className === 'listNoticesUserFav' ? css.imgFav : ''
          }`}
          src={notice.imgURL}
          alt={notice.title ? notice.title : 'Pet image'}
        />

        <div className={css.titleWrap}>
          <h3 className={css.title}>{notice.title}</h3>
          <div
            className={css.rating}
            aria-label={`Popularity: ${notice.popularity}`}
          >
            <svg
              height="16"
              width="16"
              className={css.iconStar}
              aria-hidden="true"
            >
              <use href="/images/icons.svg#icon-star" />
            </svg>
            <span>{notice.popularity}</span>
          </div>
        </div>

        <div className={css.infoWrap}>
          <p className={css.nameInfo}>
            Name: <span className={css.nameInfoPart}>{notice.name}</span>
          </p>
          <p className={css.nameInfo}>
            Birthday:{' '}
            <span className={css.nameInfoPart}>
              {formatDatePetsList(notice.birthday)}
            </span>
          </p>
          <p className={css.nameInfo}>
            Sex: <span className={css.nameInfoPart}>{notice.sex}</span>
          </p>
          <p className={css.nameInfo}>
            Species: <span className={css.nameInfoPart}>{notice.species}</span>
          </p>
          <p className={css.nameInfo}>
            Category:{' '}
            <span className={css.nameInfoPart}>{notice.category}</span>
          </p>
        </div>

        <p className={css.desc}>{removeExtraSpaces(notice.comment)}</p>
      </div>

      <div className={css.downWrapper}>
        {notice.price && <p className={css.price}>${notice.price}</p>}

        <div className={css.btnWrapper}>
          <button
            className={css.btnLearnMore}
            type="button"
            onClick={
              isLoggenIn
                ? () => setIsOpenModalNotice(true)
                : () => setShowModalAttention(true)
            }
            aria-label="Learn more about this notice"
          >
            Learn more
          </button>

          {className === 'listNoticesUserFav' ? (
            <button
              type="button"
              className={css.btnTrash}
              onClick={() => toggleFavorite()}
              aria-label="Remove from favorites"
            >
              <svg
                className={css.trash}
                height="18"
                width="18"
                aria-hidden="true"
              >
                <use href="/images/icons.svg#icon-trash" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className={css.btnHeart}
              onClick={handleHeartClick}
              disabled={isFavoriteLoading}
              aria-pressed={isFavorite}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <svg
                className={isFavorite ? css.heartActive : css.heart}
                height="18"
                width="18"
                aria-hidden="true"
              >
                <use href="/images/icons.svg#icon-heart" />
              </svg>
            </button>
          )}
        </div>

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
