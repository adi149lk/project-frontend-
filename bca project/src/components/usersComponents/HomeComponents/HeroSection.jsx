import React from "react";
import heroBG from "../../../Assets/Home/HeroBG.png";
import { FaArrowUpLong } from "react-icons/fa6";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  const scrollToSection = () => {
    const element = document.querySelector("#popular-cars");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${heroBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="px-6 md:px-10 xl:px-20 pt-10 md:pt-20 pb-5 md:pb-10"
    >
      <div className="w-full md:w-[70%] lg:w-[50%]">
        <p
          className="text-[#FF2C3B] text-xs md:text-sm uppercase font-semibold bg-[#ff2c3b22] inline-block px-4 py-1 rounded-full"
          data-aos="fade-up"
        >
          Self drive vechicles
        </p>
        <h1
          className="text-xl md:text-3xl xl:text-6xl text-white font-black xl:leading-[70px] tracking-wider my-4"
          data-aos="fade-down"
        >
          "Hassle-Free Car <span className="text-[#FF3600]">Rentals</span>,
          Anytime, Anywhere"
        </h1>
        <p
          className="text-xs md:text-lg xl:text-xl font-thin text-white xl:leading-8"
          data-aos="fade-up"
        >
          Whether you're planning a weekend getaway, a business trip, or just
          need a reliable ride for the day, we offers a wide range of vehicles
          to suit your needs.
        </p>
        <button
          onClick={scrollToSection}
          className="bg-[#FF3443]
          hover:bg-[#f10013] px-5 md:px-8 py-2 md:py-3 rounded-full text-white text-sm
          md:text-base flex items-center gap-3 my-5"
          data-aos="fade-right"
        >
          Book Now
          <FaArrowUpLong className="rotate-45" />
        </button>
      </div>
      {/* <div className="bg-white rounded-xl mt-10 lg:mt-20 md:mx-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-5">
        <div className="border-r p-3 md:p-5">
          <p className="text-[#242424] font-semibold text-xs md:text-base">
            Need a car ?
          </p>
          <p className="text-[#242424] font-bold text-sm md:text-xl py-2">
            Book now !
          </p>
        </div>
        <div className="border-r p-3 md:p-5">
          <label
            htmlFor="name"
            className="text-[#242424] font-semibold text-sm md:text-lg"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Full Name"
            className="placeholder:text-[#616161] outline-none py-2 rounded-lg text-sm md:text-base w-full"
          />
        </div>
        <div className="border-r p-3 md:p-5">
          <label
            htmlFor="mobile"
            className="text-[#242424] font-semibold text-sm md:text-lg"
          >
            Mobile No
          </label>
          <input
            type="tel"
            name="mobile"
            id="mobile"
            placeholder="Enter Phone no."
            className="placeholder:text-[#616161] outline-none py-2 rounded-lg text-sm md:text-base w-full"
          />
        </div>
        <div className="border-r p-3 md:p-5">
          <label
            htmlFor="name"
            className="text-[#242424] font-semibold text-sm md:text-lg"
          >
            Pickup Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter Location"
            className="placeholder:text-[#616161] outline-none py-2 rounded-lg text-sm md:text-base w-full"
          />
        </div>
        <div className="border-r p-3 md:p-5">
          <label
            htmlFor="date"
            className="text-[#242424] font-semibold text-sm md:text-lg "
          >
            Pickup Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="outline-none py-2 rounded-lg text-sm md:text-base w-full"
          />
        </div>
        <div className="p-3 md:p-5 flex items-center justify-center">
          <button className="bg-[#FF3443] hover:bg-[#F10013] text-white px-8 py-3 rounded-md text-lg">
            Send
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default HeroSection;
