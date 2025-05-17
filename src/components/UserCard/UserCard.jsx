import React, { useState } from "react";
import EditUserBtn from "../EditUserBtn/EditUserBtn.jsx";
import UserBlock from "../UserBlock/UserBlock.jsx";
import PetsBlock from "../PetsBlock/PetsBlock.jsx";
import css from "./UserCard.module.css";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction.jsx";
const UserCard = () => {
  const [isModalApproveAction, setIsModalApproveAction] = useState(false);
  return (
    <div className={css.wrapper}>
      <EditUserBtn />
      <UserBlock />
      <PetsBlock />
      <button onClick={() => setIsModalApproveAction(true)} className={css.btn}>
        Log out
      </button>
      {isModalApproveAction && (
        <ModalApproveAction
          isOpen={isModalApproveAction}
          onClose={() => setIsModalApproveAction(false)}
        />
      )}
    </div>
  );
};

export default UserCard;
