import { useRef } from "react";
import PasswordToggleButton from "../PasswordToggleButton/PasswordToggleButton.jsx";
import css from "./ValidatedInput.module.css";

const ValidatedInput = ({
  name,
  type = "text",
  register,
  errors,
  watchValue,
  showPasswordToggle,
  isPasswordField,
  togglePasswordVisibility,
  passwordVisible,
  placeholder,
}) => {
  const inputRef = useRef();

  const ErrorIcon = ({ isPassword }) => (
    <svg className={isPassword ? css.iconErrorPassword : css.iconError}>
      <use href="/images/icons.svg#icon-close" />
    </svg>
  );

  const SuccessIcon = ({ isPassword }) => (
    <svg className={isPassword ? css.iconSuccessPassword : css.iconSuccess}>
      <use href="/images/icons.svg#icon-check" />
    </svg>
  );

  const getInputClass = () => {
    if (errors[name]) return `${css.input} ${css.inputError}`;
    if (watchValue?.length > 0 && !errors[name])
      return `${css.input} ${css.inputSuccess}`;
    return css.input;
  };

  return (
    <label htmlFor={name} className={css.label}>
      <input
        id={name}
        ref={inputRef}
        type={isPasswordField ? (passwordVisible ? "text" : "password") : type}
        className={getInputClass()}
        value={watchValue || ""}
        placeholder={placeholder}
        {...register(name)}
        autoComplete="off"
      />

      {errors[name] ? (
        <>
          <span className={css.error}>{errors[name]?.message}</span>
          <ErrorIcon isPassword={isPasswordField} />
        </>
      ) : (
        <>
          {watchValue?.length > 0 && !errors[name] && (
            <>
              <SuccessIcon isPassword={isPasswordField} />
              {name === "password" && (
                <span className={css.secure}>Password is secure</span>
              )}
            </>
          )}
        </>
      )}

      {showPasswordToggle && (
        <PasswordToggleButton
          isVisible={passwordVisible}
          onClick={togglePasswordVisibility}
        />
      )}
    </label>
  );
};

export default ValidatedInput;
