import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="flex bg-black">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Root;
