import React from "react";
import css from "./Loader.module.css";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/users/selectors.js";
const Loader = () => {
  const isLoading = useSelector(selectLoading);
  return <> {isLoading && <div className={css.loader}>Loader</div>}</>;
};

export default Loader;
