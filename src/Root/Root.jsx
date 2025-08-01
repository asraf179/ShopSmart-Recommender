import React from "react";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer";

const Root = () => {
  return (
    <div>
      <div className="">
        <div>
          <Navbar></Navbar>
        </div>
        <div className="lg:ml-16 lg:mr-16">
          <Outlet></Outlet>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default Root;
