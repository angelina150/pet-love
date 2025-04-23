import React, { useState } from "react";
import css from "./NewsItem.module.css";

function NewsItem({ newsItem }) {
  const [isOpenMore, setIsOpenMore] = useState(false);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <li className={css.newsItem}>
      <img className={css.img} src={newsItem.imgUrl} alt="" />
      <h3 className={css.title}>{newsItem.title}</h3>
      <p className={css.desc}>{newsItem.text}</p>
      <p className={css.date}>{formatDate(newsItem.date)}</p>
      <button
        type="button"
        className={isOpenMore ? css.readMoreClose : css.readMoreOpen}
        onClick={() => setIsOpenMore(!isOpenMore)}
      >
        Read more
      </button>
    </li>
  );
}

export default NewsItem;
