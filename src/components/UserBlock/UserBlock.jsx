import { useSelector } from "react-redux";
import { selectUserFullInfo } from "../../redux/users/selectors.js";
import css from "./UserBlock.module.css";
import { formatPhoneNumber } from "../../utils.js";

const UserBlock = ({ openModalEditUser }) => {
  const userFullInfo = useSelector(selectUserFullInfo);
  return (
    <div className={css.wrapperUserBlock}>
      <div className={css.userBlock}>
        User
        <svg className={css.iconUserBlock} width="18" height="18">
          <use href="/images/icons.svg#icon-user"></use>
        </svg>
      </div>
      {userFullInfo?.avatar ? (
        <img
          loading="lazy"
          className={css.img}
          src={userFullInfo.avatar}
          alt="User avatar"
        />
      ) : (
        <>
          <div className={css.iconUserWrap}>
            <svg className={css.iconUser}>
              <use href="/images/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button
            onClick={openModalEditUser}
            className={css.btnUpload}
            type="button"
          >
            Upload photo
          </button>
        </>
      )}
      <h3 className={css.title}>My information</h3>
      <div className={css.infoWrapper}>
        <p
          className={`${css.info} ${
            userFullInfo?.name?.length > 0 ? '' : css.infoEmpty
          }`}
        >
          {userFullInfo?.name}
        </p>
        <p
          className={` ${css.info} ${
            userFullInfo?.email?.length > 0 ? '' : css.infoEmpty
          }`}
        >
          {userFullInfo?.email}
        </p>
        <p
          className={`${css.info} ${
            userFullInfo?.phone?.length > 0 ? '' : css.infoEmpty
          }`}
        >
          {userFullInfo?.phone ? formatPhoneNumber(userFullInfo.phone) : '+380'}
        </p>
      </div>
    </div>
  );
};

export default UserBlock;
