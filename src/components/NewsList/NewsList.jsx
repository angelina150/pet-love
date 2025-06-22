import React from 'react';
import NewsItem from '../NewsItem/NewsItem.jsx';
import css from './NewsList.module.css';
const NewsList = ({ news }) => {
  return (
    <ul className={css.list} aria-label="News articles list">
      {news?.map(item => (
        <NewsItem key={item._id} newsItem={item} />
      ))}
    </ul>
  );
};

export default NewsList;
