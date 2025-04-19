import React, { useState } from "react";
import ModalEditUser from "../ModalEditUser/ModalEditUser.jsx";
import css from "./EditUserBtn.module.css";
const EditUserBtn = () => {
  const [isModalEditUser, setIsModalEditUser] = useState(false);
  return (
    <>
      <button
        className={css.btn}
        onClick={() => setIsModalEditUser(true)}
        type="button"
      >
        <svg height="18" width="18">
          <use href="/images/icons.svg#icon-edit"></use>
        </svg>
      </button>
      {isModalEditUser && (
        <ModalEditUser
          isOpen={isModalEditUser}
          onClose={() => setIsModalEditUser(false)}
        />
      )}
    </>
  );
};

export default EditUserBtn;
