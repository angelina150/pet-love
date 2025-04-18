import React, { useState } from "react";
import css from "./LogOutBtn.module.css";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction.jsx";

const LogOutBtn = () => {
  const [isModalApproveAction, setIsModalApproveAction] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalApproveAction(true)} className={css.btn}>
        Log out
      </button>
      {isModalApproveAction && (
        <ModalApproveAction
          isOpen={isModalApproveAction}
          onClose={() => setIsModalApproveAction(false)}
        />
      )}
    </>
  );
};

export default LogOutBtn;
