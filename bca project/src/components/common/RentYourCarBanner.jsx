import React from "react";
import bannerBG from "../../Assets/common/bannerBG.png";
import { FaPhoneVolume } from "react-icons/fa6";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

const RentYourCarBanner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  return (
    <div className="mx-4 md:mx-6 xl:mx-20">
      <div
        style={{
          backgroundImage: `url(${bannerBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 px-3 md:px-8 py-4  rounded-3xl"
      >
        {/* section content */}
        <div>
          <h2
            className="font-extrabold text-white text-lg md:text-2xl xl:text-4xl md:my-4"
            data-aos="fade-down-right"
          >
            Rent Your Car Now
          </h2>
          <p
            className="text-[#C3C3C3] font-medium text-xs md:text-base"
            data-aos="fade-down-left"
          >
            Our streamlined process ensures a seamless car rental experience
            from start to finish. With easy online booking, flexible pick-up and
            drop-off options.
          </p>
        </div>

        {/* Contact number */}
        <div className="w-full flex gap-5 flex-col md:items-end items-center">
          <div className="lg:w-2/3 border-2 border-[#FF3443] pr-5 flex items-center gap-4 text-xl md:text-2xl xl:text-4xl text-white font-bold rounded-full">
            <span
              className="bg-[#FF3443] rounded-full p-3 text-xl md:text-3xl xl:text-4xl text-black"
              data-aos="fade-up-right"
            >
              <FaPhoneVolume size={32} />
            </span>
            <h4 data-aos="fade-up-left">+91 9348994082</h4>
          </div>
          <div className="lg:w-2/3 flex items-center justify-center gap-4 text-xl md:text-2xl xl:text-4xl text-white font-bold border-2 border-[#DADADA] pl-6 rounded-full">
            <h4 data-aos="fade-up-right">+91 9938848434</h4>
            <span
              className="bg-[#DADADA] rounded-full p-3 text-xl md:text-3xl xl:text-4xl text-black"
              data-aos="fade-up-left"
            >
              <FaPhoneVolume size={32} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentYourCarBanner;
