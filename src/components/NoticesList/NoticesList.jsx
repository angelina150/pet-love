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
        return <NoticesItem key={notice.id} notice={notice} />;
      })}
    </ul>
  );
};

export default NoticesList;
