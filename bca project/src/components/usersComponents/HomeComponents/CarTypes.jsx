import React from "react";
import bgImage from "../../../Assets/Home/carTypesBG.png";
import miniCar from "../../../Assets/Home/mini.png";
import sedanCar from "../../../Assets/Home/sedan.png";
import hatchbackCar from "../../../Assets/Home/hatchback.png";
import suvCar from "../../../Assets/Home/suv.png";
import luxuryCar from "../../../Assets/Home/luxury.png";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

const CarTypes = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  return (
    <div
      className="text-center px-6 md:px-10 xl:px-24 pt-5 md:pt-10 xl:pt-14"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "contain",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* section heading */}
      <p
        className="text-[#FF2C3B] text-xs md:text-sm uppercase font-semibold bg-[#ff2c3b22] inline-block px-4 py-1 rounded-full"
        data-aos="fade-up-right"
      >
        Car Types
      </p>
      <h1
        className="text-xl md:text-3xl xl:text-5xl text-[#242424] font-extrabold my-5"
        data-aos="fade-up-left"
      >
        Explore Car Types
      </h1>
      {/* Different types Cars */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 pb-10 "
        data-aos="fade-up"
      >
        <CarCard image={miniCar} title="Mini" />
        <CarCard image={sedanCar} title="Sedan" />
        <CarCard image={hatchbackCar} title="Hatchback" />
        <CarCard image={suvCar} title="SUV" />
        <CarCard image={luxuryCar} title="Luxury" />
      </div>
    </div>
  );
};

export default CarTypes;

export const CarCard = ({ image, title }) => {
  return (
    <div className="bg-white rounded-xl border-2 flex flex-col items-center justify-center p-4 hover:scale-105 transition duration-200 hover:shadow-md">
      <img src={image} alt="Car" className="w-52 py-5" />
      <h4 className="md:text-xl font-semibold">{title}</h4>
    </div>
  );
};
