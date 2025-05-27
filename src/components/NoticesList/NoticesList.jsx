import React from "react";
import NoticesItem from "../NoticesItem/NoticesItem.jsx";
import css from "./NoticesList.module.css";
import { useLocation } from "react-router-dom";

const NoticesList = ({ notices }) => {
  const location = useLocation();
  const isProfile = location.pathname === "/profile";
  return (
    <ul className={`${css.list} ${isProfile ? css.listProfile : ""}`}>
      {notices?.map((notice) => {
        return <NoticesItem key={notice._id} notice={notice} />;
      })}
    </ul>
  );
};

export default NoticesList;
