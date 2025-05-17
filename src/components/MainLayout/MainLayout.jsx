import React from "react";
import Header from "../Header/Header.jsx";
import Loader from "../Loader/Loader.jsx";
import { Outlet } from "react-router-dom";
import css from "./MainLayout.module.css";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/users/selectors.js";
import { selectNewsLoading } from "../../redux/news/selectors.js";
import { selectLoadingFriends } from "../../redux/friends/selectors.js";
import { selectLoadingNotices } from "../../redux/notices/selectors.js";

const MainLayout = () => {
  const isLoadingUser = useSelector(selectLoading);
  const isLoadingNews = useSelector(selectNewsLoading);
  const isLoadingFriends = useSelector(selectLoadingFriends);
  const isLoadingNotices = useSelector(selectLoadingNotices);

  const loading =
    isLoadingUser || isLoadingNews || isLoadingFriends || isLoadingNotices;

  return (
    <div>
      <header>
        <Header />
      </header>

      <main>
        {loading && (
          <div className={css.wrapperLoader}>
            <Loader />
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
