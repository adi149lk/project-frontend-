import React, { useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import img1 from "../../../Assets/Images/AboutuspageSideimage.png";

const HowItWorks = () => {
  const steps = [
    {
      title: "Browse And Select",
      description:
        "Explore our diverse selection of high-end vehicles, choose your preferred pickup and return dates, and select a location that best fits your needs",
    },
    {
      title: "Book And Confirm",
      description:
        "Complete your reservation by providing necessary details and confirming your booking preferences",
    },
    {
      title: "Book And Enjoy",
      description:
        "Pick up your vehicle and enjoy your hassle-free rental experience",
    },
  ];

  const [visibleDescriptions, setVisibleDescriptions] = useState(
    steps.map(() => false)
  );

  const toggleDescription = (index) => {
    setVisibleDescriptions((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="mx-auto  py-4 sm:py-6 px-6 md:px-10 xl:px-20 w-full">
      <div className="inline-block mb-4 sm:mb-6">
        <div className="bg-red-100 rounded-xl">
          <p className="text-xs sm:text-sm px-4 sm:px-6 py-1 text-red-600 font-semibold uppercase">
            How it works
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 font-geologica capitalize">
            Streamlined processes for a hassle-free experience
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 font-dmsans">
            Our streamlined process ensures a seamless car rental experience
            from start to finish. With easy online booking, flexible pick-up and
            drop-off options.
          </p>

          <div className="space-y-4 sm:space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-3 sm:pb-4 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg  text-gray-900 font-bold font-geologica">
                    {step.title}
                  </h3>
                  <button
                    className="font-bold transform transition-transform duration-200 hover:bg-gray-100 rounded-full p-1"
                    onClick={() => toggleDescription(index)}
                    style={{
                      transform: visibleDescriptions[index]
                        ? "rotate(90deg)"
                        : "rotate(-90deg)",
                    }}
                  >
                    <IoIosArrowBack size={20} className="text-gray-600" />
                  </button>
                </div>
                {visibleDescriptions[index] && (
                  <p className="mt-2 text-sm sm:text-base text-gray-600 transition-all duration-200 font-dmsans">
                    {step.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-6 md:mt-0">
          <div className="rounded-lg overflow-hidden h-48 sm:h-64 md:h-72 lg:h-[355px]">
            <img
              src={img1}
              alt="Car on foggy road"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
