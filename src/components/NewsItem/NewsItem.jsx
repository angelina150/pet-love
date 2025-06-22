import React, { useRef } from 'react';
import css from './NewsItem.module.css';
import { formatDate } from '../../utils.js';

function NewsItem({ newsItem }) {
  const cardRef = useRef(null);

  const handleReadMoreClick = () => {
    const newWindow = window.open(
      newsItem.url,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  };
  return (
    <li className={css.newsItem} ref={cardRef}>
      <div>
        <img
          className={css.img}
          src={newsItem.imgUrl}
          alt={newsItem.title || 'News image'}
          loading="lazy"
        />
        <h3 className={css.title}>{newsItem.title}</h3>
        <p className={css.desc}>{newsItem.text}</p>
      </div>
      <div className={css.spacer} />
      <div className={css.downPartWrap}>
        <p className={css.date}>{formatDate(newsItem.date)}</p>
        <button
          aria-label={`Read more about ${newsItem.title}`}
          type="button"
          className={css.btnReadMore}
          onClick={handleReadMoreClick}
        >
          Read more
        </button>
      </div>
    </li>
  );
}

export default NewsItem;
