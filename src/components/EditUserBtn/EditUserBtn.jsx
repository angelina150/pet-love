import React, { useState } from "react";
import ModalEditUser from "../ModalEditUser/ModalEditUser.jsx";
import css from "./EditUserBtn.module.css";
const EditUserBtn = () => {
  const [isModalEditUser, setIsModalEditUser] = useState(false);
  return (
    <div className={css.wrap}>
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
    </div>
  );
};

export default EditUserBtn;
