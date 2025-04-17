import React from "react";
import Header from "../../components/Header/Header.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div>
      <Header />
      <Loader />
      <Outlet />
    </div>
  );
};

export default MainLayout;
