import React from "react";
import frame from "../../assets/frame.svg";
import { MdDoubleArrow } from "react-icons/md";

const UserHeader = ({ mainText, pageName }) => {
  return (
    <header
      style={{ backgroundImage: `url(${frame})` }}
      className="bg-cover bg-center flex flex-col md:flex-row items-center w-full h-60 py-4 lg:px-20 md:px-10 px-5 md:p-10 "
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-center">
        <div>
          <h1 className="text-white tracking-wider text-3xl md:text-4xl font-bold text-center">
            {pageName}
          </h1>

          <div className="mt-4 flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center">
              <span className="text-white tracking-wider text-lg md:text-xl font-semibold">
                {mainText}
              </span>

              <span className="text-white mx-2">
                <MdDoubleArrow size={22} />
              </span>

              <span className="text-white tracking-wider text-lg md:text-xl font-semibold">
                {pageName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
