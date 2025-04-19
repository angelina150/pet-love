import React from "react";
import UserCard from "../../components/UserCard/UserCard.jsx";
import MyNotices from "../../components/MyNotices/MyNotices.jsx";

const ProfilePage = () => {
  return (
    <div>
      <UserCard />
      <MyNotices />
    </div>
  );
};

export default ProfilePage;
