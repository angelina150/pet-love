import React, { useState, useEffect, useRef } from "react";
import css from "./NewsItem.module.css";

function NewsItem({ newsItem }) {
  const [isOpenMore, setIsOpenMore] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const cardRef = useRef(null);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (cardRef.current && cardRef.current.offsetHeight > 476) {
      setIsLong(true);
    }
  }, []);

  const shortText =
    newsItem.text.length > 200
      ? newsItem.text.slice(0, newsItem.text.slice(0, 200).lastIndexOf(" ")) +
        "..."
      : newsItem.text;

  const handleReadMoreClick = () => {
    const newWindow = window.open(
      newsItem.url,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };
  return (
    <li className={css.newsItem} ref={cardRef}>
      <div>
        <img className={css.img} src={newsItem.imgUrl} alt="News" />
        <h3 className={css.title}>{newsItem.title}</h3>
        <p className={css.desc}>
          {isLong && !isOpenMore ? shortText : newsItem.text}
        </p>
      </div>

      <div className={css.downPartWrap}>
        <p className={css.date}>{formatDate(newsItem.date)}</p>
        <button
          type="button"
          className={isOpenMore ? css.readMoreClose : css.readMoreOpen}
          onClick={handleReadMoreClick}
        >
          Read more
        </button>
      </div>
    </li>
  );
}

export default NewsItem;
