import React from "react";
import Header from "../Header/Header.jsx";
import { Outlet } from "react-router-dom";
import css from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={css.wrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
