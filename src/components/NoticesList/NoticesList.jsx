import React from "react";
import { useSelector } from "react-redux";
import { selectNotices } from "../../redux/notices/selectors.js";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";
import css from "./NoticesList.module.css";

const NoticesList = () => {
  const notices = useSelector(selectNotices);
  return (
    <ul className={css.list}>
      {notices?.map((notice) => {
        console.log(notice);
        return <NoticesItem key={notice._id} notice={notice} />;
      })}
    </ul>
  );
};

export default NoticesList;
