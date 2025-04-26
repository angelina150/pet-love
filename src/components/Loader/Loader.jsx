// Loader.jsx
import React from "react";
import css from "./Loader.module.css";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/users/selectors.js";
import { selectLoadingFriends } from "../../redux/friends/selectors.js";
import { selectNewsLoading } from "../../redux/news/selectors.js";
import { selectLoadingNotices } from "../../redux/notices/selectors.js";

const Loader = () => {
  const isLoadingUser = useSelector(selectLoading);
  const isLoadingNews = useSelector(selectNewsLoading);
  const isLoadingFriends = useSelector(selectLoadingFriends);
  const isLoadingNotices = useSelector(selectLoadingNotices);
  return (
    <div className={css.wrapper}>
      {(isLoadingUser ||
        isLoadingNews ||
        isLoadingFriends ||
        isLoadingNotices) && (
        <div className={css.loader}>
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Loader;
