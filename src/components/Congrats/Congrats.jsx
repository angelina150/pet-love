import React, { Modal } from 'react';
import css from './Congrats.module.css';
const Congrats = () => {
  return (
    <Modal
      className={css.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
    >
      <img className={css.img} loading="lazy" src="/images/cat.png" alt="Cat" />
      <h2 id="modal-title" className={css.title}>
        Congrats
      </h2>
      <p id="modal-desc" className={css.desc}>
        The first fluff in the favorites! May your friendship be the happiest
        and filled with fun.
      </p>
      <button className={css.btn}>Go to profile</button>
    </Modal>
  );
};

export default Congrats;
