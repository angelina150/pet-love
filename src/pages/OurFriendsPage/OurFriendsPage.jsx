import React from "react";
import OurFriendsList from "../../components/OurFriendsList/OurFriendsList.jsx";
import Title from "../../components/Title/Title.jsx";
import css from "./OurFriendsPage.module.css";
const OurFriendsPage = () => {
  return (
    <div className={css.wrapper}>
      <Title>Our friends</Title>
      <OurFriendsList />
    </div>
  );
};

export default OurFriendsPage;
