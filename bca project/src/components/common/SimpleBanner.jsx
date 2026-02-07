import React from "react";

const SimpleBanner = ({ image, name, path }) => {
  return (
    <div
      className="h-[350px] flex items-center md:justify-normal justify-center"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="text-[#050505] mx-auto mb-40">
        <div className="text-2xl md:text-4xl  font-bold tracking-wide capitalize font-geologica">
          <i>{name}</i>
        </div>
        <p className="tracking-wider mt-2 capitalize text-md text-center font-dmsans">
          {path}
        </p>
      </div>
    </div>
  );
};

export default SimpleBanner;
