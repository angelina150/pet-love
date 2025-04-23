import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFullInfo } from "../../redux/users/selectors.js";
import EditUserBtn from "../EditUserBtn/EditUserBtn.jsx";
import { fetchUserFullInfo } from "../../redux/users/operations.js";
import css from "./UserBlock.module.css";

const UserBlock = () => {
  const dispatch = useDispatch();
  const userFullInfo = useSelector(selectUserFullInfo);
  useEffect(() => {
    dispatch(fetchUserFullInfo());
  }, [dispatch]);
  return (
    <div>
      {userFullInfo?.avatar ? (
        <img className={css.img} src={userFullInfo.avatar} alt="User avatar" />
      ) : (
        <EditUserBtn />
      )}
      <h3 className={css.title}>My information</h3>
      <p className={css.info}>{userFullInfo?.name}</p>
      <p className={css.info}>{userFullInfo?.email}</p>
      <p className={css.info}>{userFullInfo?.phone || "+380"}</p>
    </div>
  );
};

export default UserBlock;
