import React from 'react';
import UserCard from '../../components/UserCard/UserCard.jsx';
import MyNotices from '../../components/MyNotices/MyNotices.jsx';
import css from './ProfilePage.module.css';
const ProfilePage = () => {
  return (
    <section className={css.wrapper}>
      <UserCard />
      <MyNotices />
    </section>
  );
};

export default ProfilePage;
