import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFullInfo } from "../../redux/users/selectors.js";
import EditUserBtn from "../EditUserBtn/EditUserBtn.jsx";
import { fetchUserFullInfo } from "../../redux/users/operations.js";

const UserBlock = () => {
  const dispatch = useDispatch();
  const userFullInfo = useSelector(selectUserFullInfo);
  useEffect(() => {
    dispatch(fetchUserFullInfo());
  }, [dispatch]);
  console.log("userInf", userFullInfo);
  return (
    <div>
      {userFullInfo?.avatar ? (
        <img src={userFullInfo.avatar} alt="User avatar" />
      ) : (
        <EditUserBtn />
      )}
      <p>{userFullInfo?.name}</p>
      <p>{userFullInfo?.email}</p>
      <p>{userFullInfo?.phone}</p>
    </div>
  );
};

export default UserBlock;
