import React, { useEffect, useState } from "react";
import bgImage from "../../../Assets/Home/numbersBG.png";
import carImg from "../../../Assets/Home/numbersCar.png";
import carImg2 from "../../../Assets/Home/numbersCar2.png";
import "aos/dist/aos.css";

import AOS from "aos";

const Numbers = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  const [hovered, setHovered] = useState(false);
  const [count, setCount] = useState({
    km: 1,
    experience: 1,
    clients: 1,
    vehicles: 1,
  });

  useEffect(() => {
    const animateCount = (key, target) => {
      let start = 1;
      const duration = 3000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / target));

      const timer = setInterval(() => {
        start += 1;
        setCount((prev) => ({ ...prev, [key]: start }));
        if (start >= target) {
          clearInterval(timer);
          setCount((prev) => ({ ...prev, [key]: target }));
        }
      }, stepTime);
    };

    animateCount("km", 90);
    animateCount("experience", 2);
    animateCount("clients", 2);
    animateCount("vehicles", 1);
  }, []);

  return (
    <div className="px-6 md:px-10 xl:px-20 pt-5 md:pt-10">
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "cenetr",
        }}
        className="flex rounded-3xl px-5 xl:px-16 py-4 md:py-8 xl:py-12"
      >
        <div>
          <p
            className="text-[#EBEBEB] text-xs md:text-sm uppercase font-medium bg-[#ebebeb33] inline-block px-6 py-1 rounded-full"
            data-aos="fade-up"
          >
            Numbers
          </p>
          <h1
            className="text-lg md:text-xl xl:text-3xl text-[#ECECEC] font-extrabold my-5 lg:w-[80%]"
            data-aos="fade-down"
          >
            Explore the world with your own way of driving
          </h1>
          <div className="flex flex-wrap gap-5 lg:gap-12 w-full lg:w-[70%]">
            <div className="text-center" data-aos="fade-right">
              <h1 className="text-[#FF2C3B] font-black text-lg md:text-3xl xl:text-5xl">
                {count.km.toLocaleString()}K+
              </h1>
              <h4 className="text-white font-semibold text-sm md:text-lg tracking-wider">
                KM Completed
              </h4>
            </div>
            <div className="text-center" data-aos="fade-left">
              <h1 className="text-[#FF2C3B] font-black text-lg md:text-3xl xl:text-5xl">
                {count.experience}+
              </h1>
              <h4 className="text-white font-semibold text-sm md:text-lg tracking-wider">
                Yr Experience
              </h4>
            </div>
            <div className="text-center" data-aos="fade-right">
              <h1 className="text-[#FF2C3B] font-black text-lg md:text-3xl xl:text-5xl">
                {count.clients.toLocaleString()}K+
              </h1>
              <h4 className="text-white font-semibold text-sm md:text-lg tracking-wider">
                Happy Clients
              </h4>
            </div>
            <div className="text-center" data-aos="fade-left">
              <h1 className="text-[#FF2C3B] font-black text-lg md:text-3xl xl:text-5xl">
                {count.vehicles.toLocaleString()}K+
              </h1>
              <h4 className="text-white font-semibold text-sm md:text-lg tracking-wider">
                Total Vehicles
              </h4>
            </div>
          </div>
        </div>
        <img
          src={hovered ? carImg2 : carImg}
          alt="Car"
          className="hidden md:block h-56 lg:h-80 w-[50%] transition-all duration-700 ease-in-out"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          data-aos="fade-left"
        />
      </div>
    </div>
  );
};

export default Numbers;
