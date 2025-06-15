import React, { useState } from 'react';
import EditUserBtn from '../EditUserBtn/EditUserBtn.jsx';
import UserBlock from '../UserBlock/UserBlock.jsx';
import PetsBlock from '../PetsBlock/PetsBlock.jsx';
import css from './UserCard.module.css';
import ModalApproveAction from '../ModalApproveAction/ModalApproveAction.jsx';
import ModalEditUser from '../ModalEditUser/ModalEditUser.jsx';
import { useSelector } from 'react-redux';
import { selectUserFullInfo } from '../../redux/users/selectors.js';
const UserCard = () => {
  const userFullInfo = useSelector(selectUserFullInfo);
  const [isModalApproveAction, setIsModalApproveAction] = useState(false);
  const [isModalEditUser, setIsModalEditUser] = useState(false);
  return (
    <div className={css.wrapper}>
      <EditUserBtn
        isModalEditUser={isModalEditUser}
        setIsModalEditUser={setIsModalEditUser}
      />
      <UserBlock openModalEditUser={() => setIsModalEditUser(true)} />
      <PetsBlock />
      <button
        onClick={() => setIsModalApproveAction(true)}
        className={`${css.btn} ${
          userFullInfo?.pets?.length === 0 ? css.btnIsPetsBlock : ''
        }`}
      >
        Log out
      </button>
      {isModalApproveAction && (
        <ModalApproveAction
          isOpen={isModalApproveAction}
          onClose={() => setIsModalApproveAction(false)}
        />
      )}
      {isModalEditUser && (
        <ModalEditUser
          isOpen={isModalEditUser}
          onClose={() => setIsModalEditUser(false)}
        />
      )}
    </div>
  );
};

export default UserCard;
