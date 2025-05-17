import { useSelector } from "react-redux";
import { selectUserFullInfo } from "../../redux/users/selectors.js";
import EditUserBtn from "../EditUserBtn/EditUserBtn.jsx";
import css from "./UserBlock.module.css";

const UserBlock = () => {
  const userFullInfo = useSelector(selectUserFullInfo);

  return (
    <div>
      {userFullInfo?.avatar ? (
        <img className={css.img} src={userFullInfo.avatar} alt="User avatar" />
      ) : (
        <>
          <div className={css.iconUserWrap}>
            <svg width="50" height="50">
              <use href="/images/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button className={css.btnUpload} type="button">
            Upload photo
          </button>
        </>
      )}
      <h3 className={css.title}>My information</h3>
      <p className={css.info}>{userFullInfo?.name}</p>
      <p className={css.info}>{userFullInfo?.email}</p>
      <p className={css.info}>{userFullInfo?.phone || "+380"}</p>
    </div>
  );
};

export default UserBlock;
