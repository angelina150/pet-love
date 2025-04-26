import React from "react";
import css from "./NoticesItem.module.css";

const NoticesItem = ({ notice }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
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
            {formatDate(notice.birthday)}
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
        <p className={css.price}>${notice.price}</p>
      </div>

      <div className={css.btnWrapper}>
        <button className={css.btnLearnMore} type="button">
          Learn more
        </button>
        <button type="button" className={css.btnHeart}>
          <svg height="18" width="18">
            <use href="/images/icons.svg#icon-heart"></use>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default NoticesItem;
