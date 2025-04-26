import React from "react";
import Header from "../../components/Header/Header.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { Outlet } from "react-router-dom";
import css from "./MainLayout.module.css";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/users/selectors.js";

const MainLayout = () => {
  const loading = useSelector(selectLoading);

  return (
    <div>
      {!loading && (
        <header>
          <Header />
        </header>
      )}

      {loading ? (
        <div className={css.wrapperLoader}>
          <Loader />
        </div>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default MainLayout;
