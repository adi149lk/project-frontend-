//This page will render page loader while navigating to another route
import React from "react";
import { Outlet } from "react-router-dom";
import PageLoader from "../components/common/PageLoader";

const Layout = () => {
  return (
    <>
      <PageLoader />
      <Outlet />
    </>
  );
};

export default Layout;
