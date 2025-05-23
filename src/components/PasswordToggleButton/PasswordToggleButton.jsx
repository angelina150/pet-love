import css from "./PasswordToggleButton.module.css";

const PasswordToggleButton = ({ isVisible, onClick }) => (
  <button className={css.btnShowPassword} type="button" onClick={onClick}>
    {isVisible ? (
      <svg className={css.iconEye}>
        <use href="/images/icons.svg#icon-eye"></use>
      </svg>
    ) : (
      <svg className={css.iconEye}>
        <use href="/images/icons.svg#icon-eye-off"></use>
      </svg>
    )}
  </button>
);
export default PasswordToggleButton;
