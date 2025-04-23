import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFriends } from "../../redux/friends/selectors.js";
import OurFriendsItem from "../OurFriendsItem/OurFriendsItem.jsx";
import { fetchFriends } from "../../redux/friends/operations.js";
import css from "./OurFriendsList.module.css";

const OurFriendsList = () => {
  const friends = useSelector(selectFriends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div>
      {friends?.map((friend) => (
        <ul className={css.list}>
          <OurFriendsItem key={friend.id} friend={friend} />
        </ul>
      ))}
    </div>
  );
};

export default OurFriendsList;
