import React from 'react';
import NoticesItem from '../NoticesItem/NoticesItem.jsx';
import css from './NoticesList.module.css';

const NoticesList = ({ notices, className }) => {
  return (
    <ul
      className={`${css.list} ${
        className === 'listNoticesUserFav' ||
        className === 'listNoticesUserViewed'
          ? css.listNoticesUserFav
          : ''
      }`}
    >
      {notices?.map(notice => {
        return (
          <NoticesItem className={className} key={notice._id} notice={notice} />
        );
      })}
    </ul>
  );
};

export default NoticesList;
