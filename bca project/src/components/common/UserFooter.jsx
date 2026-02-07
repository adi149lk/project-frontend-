import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const UserFooter = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <React.Fragment>
      <Footer />

      <div className="flex justify-center items-center w-full py-2 px-6 text-sm bg-yellow-500 text-white tracking-wider">
        <div className="mr-4">
          <span> &nbsp;© copyright {currentYear}, </span>
          <span className="textprimaryTextColor font-semibold">
            Car Rental &nbsp;|| &nbsp;
          </span>
          <span
            className="text-[#fe8740] cursor-pointer"
            onClick={() => window.open("https://webbocket.com/")}
          >
            Web_Bocket PVT LTD.
          </span>{" "}
          All Rights Reserved.
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserFooter;
