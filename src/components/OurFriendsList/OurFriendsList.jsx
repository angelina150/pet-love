import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OurFriendsItem from '../OurFriendsItem/OurFriendsItem.jsx';
import { fetchFriends } from '../../redux/friends/operations.js';
import css from './OurFriendsList.module.css';

const OurFriendsList = ({ friends }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!friends || friends.length === 0) {
      dispatch(fetchFriends());
    }
  }, [dispatch, friends]);

  return (
    <ul className={css.list} aria-label="Our friends list">
      {friends?.map(friend => (
        <OurFriendsItem key={friend?._id} friend={friend} />
      ))}
    </ul>
  );
};

export default OurFriendsList;
