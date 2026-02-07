import React from "react";
import partnerImage from "../../../Assets/Home/partnerImage.png";
import bookingIcon from "../../../Assets/Home/bookingIcon.png";
import carIcon from "../../../Assets/Home/pickupIcon.png";
import bgImage from "../../../Assets/Home/carTypesBG.png";
import { IoArrowUp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

const TrustedPartner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  const navigate = useNavigate();
  const goToContactPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/contact");
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "bottom",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-10 xl:px-20 py-10 md:py-16"
    >
      <div>
        <img src={partnerImage} alt="partner " data-aos="fade-right" />
      </div>
      <div className="flex flex-col items-start">
        <h2
          className="text-[#242424] text-xl md:text-3xl xl:text-5xl font-extrabold w-3/4 "
          data-aos="fade-up"
        >
          Your trusted partner in reliable car rental
        </h2>
        <p
          className="text-[#616161] text-xs md:text-lg md:w-[90%] my-4"
          data-aos="fade-right"
        >
          Count on us for dependable car rental services tailored to your needs.
          As your trusted partner, we ensure every ride is smooth, affordable,
          and stress-free."
        </p>
        <div className="flex gap-5 items-center border-b py-5">
          <div>
            <img src={bookingIcon} alt="icon" data-aos="fade-right" />
          </div>
          <div>
            <h4
              className="text-[#040401] font-bold text-lg md:text-xl"
              data-aos="fade-left"
            >
              Easy Booking Process
            </h4>
            <p
              className="text-[#616161] text-xs md:text-lg "
              data-aos="fade-left"
            >
              We Have Optimized The Booking Process So That Our Clients Can
              Experience The Easiest And The Safest Service
            </p>
          </div>
        </div>
        <div className="flex gap-5 items-center py-5">
          <div>
            <img src={carIcon} alt="icon" data-aos="fade-right" />
          </div>
          <div>
            <h4
              className="text-[#040401] font-bold text-lg md:text-xl"
              data-aos="fade-left"
            >
              Convenient Pick-Up & Return Process
            </h4>
            <p
              className="text-[#616161] text-xs md:text-lg "
              data-aos="fade-left"
            >
              We Have Optimized The Booking Process So That Our Clients Can
              Experience The Easiest And The Safest Service
            </p>
          </div>
        </div>
        <div
          className="flex items-center justify-start gap-4"
          data-aos="fade-right"
        >
          <button
            className="bg-[#FF3443] hover:bg-[#FF3600] text-white rounded-lg font-semibold px-6 md:px-10  py-2 md:py-3"
            onClick={goToContactPage}
            data-aos="fade-up"
          >
            Contact Us
          </button>
          <button className="bg-[#FF3443] hover:bg-[#FF3600] text-white rounded-full text-3xl font-semibold p-2 md:p-2 rotate-45">
            <IoArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustedPartner;
