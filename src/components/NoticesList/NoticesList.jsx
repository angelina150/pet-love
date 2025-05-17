import React from "react";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";
import css from "./NoticesList.module.css";

const NoticesList = ({ notices }) => {
  return (
    <ul className={css.list}>
      {notices?.map((notice) => {
        return <NoticesItem key={notice._id} notice={notice} />;
      })}
    </ul>
  );
};

export default NoticesList;
