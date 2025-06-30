import React from 'react';
import Header from '../Header/Header.jsx';
import { Outlet } from 'react-router-dom';
import css from './MainLayout.module.css';
import Loader from '../Loader/Loader.jsx';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/users/selectors.js';
import { selectNewsLoading } from '../../redux/news/selectors.js';
import { selectLoadingFriends } from '../../redux/friends/selectors.js';
import { selectLoadingNotices } from '../../redux/notices/selectors.js';

const MainLayout = () => {
  const loadingNews = useSelector(selectNewsLoading);
  const loadingFriends = useSelector(selectLoadingFriends);
  const loadingNotices = useSelector(selectLoadingNotices);
  const loadingUser = useSelector(selectLoading);
  const loading =
    loadingNews || loadingFriends || loadingNotices || loadingUser;
  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className={css.wrapper}>
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
