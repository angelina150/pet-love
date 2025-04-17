import React from "react";
import css from "./Title.module.css";

export default function Title({ children }) {
  return <h2 className={css.title}>{children}</h2>;
}
