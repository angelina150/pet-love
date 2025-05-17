import React, { Modal } from "react";
import css from "./Congrats.module.css";
const Congrats = () => {
  return (
    <Modal className={css.modal}>
      <img className={css.img} src="" alt="" />
      <h2 className={css.title}>Congrats</h2>
      <p className={css.desc}>
        The first fluff in the favorites! May your friendship be the happiest
        and filled with fun.
      </p>
      <button className={css.btn}>Go to profile</button>
    </Modal>
  );
};

export default Congrats;
