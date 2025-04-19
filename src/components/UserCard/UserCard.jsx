import React from "react";
import EditUserBtn from "../EditUserBtn/EditUserBtn.jsx";
import LogOutBtn from "../LogOutBtn/LogOutBtn.jsx";
import UserBlock from "../UserBlock/UserBlock.jsx";
import PetsBlock from "../PetsBlock/PetsBlock.jsx";

const UserCard = () => {
  return (
    <div>
      <EditUserBtn />
      <UserBlock />
      <PetsBlock />
      <LogOutBtn />
    </div>
  );
};

export default UserCard;
