import React from 'react';
import OurFriendsList from '../../components/OurFriendsList/OurFriendsList.jsx';
import Title from '../../components/Title/Title.jsx';
import css from './OurFriendsPage.module.css';
import { useSelector } from 'react-redux';
import { selectFriends } from '../../redux/friends/selectors.js';
const OurFriendsPage = () => {
  const friends = useSelector(selectFriends);
  return (
    <section className={css.wrapper}>
      <Title>Our friends</Title>
      <OurFriendsList friends={friends} />
    </section>
  );
};

export default OurFriendsPage;
