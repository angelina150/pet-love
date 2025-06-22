import React from 'react';
import ModalEditUser from '../ModalEditUser/ModalEditUser.jsx';
import css from './EditUserBtn.module.css';
const EditUserBtn = ({ setIsModalEditUser }) => {
  return (
    <div className={css.wrap}>
      <button
        className={css.btn}
        onClick={() => setIsModalEditUser(true)}
        type="button"
        aria-label="Edit user"
      >
        <svg height="18" width="18" aria-hidden="true" focusable="false">
          <use href="/images/icons.svg#icon-edit"></use>
        </svg>
      </button>
    </div>
  );
};

export default EditUserBtn;
