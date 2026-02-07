import React from "react";
import img1 from "../../../Assets/Images/Logo1.png";
import img2 from "../../../Assets/Images/Logo2.png";
import img3 from "../../../Assets/Images/Logo3.png";

const PlanYourTrip = () => {
  return (
    <div className="w-full mx-auto xl:px-20 lg:px-12 sm:px-8 px-4  py-6 font-geologica ">
      <div className="bg-red-100 rounded-xl sm:w-[20%] mx-auto w-full">
        <p className="text-xs sm:text-sm px-4 sm:px-6 py-1 text-red-600 font-semibold uppercase text-center">
          Plan your trip now
        </p>
      </div>
      <h2 className="text-center text-3xl font-bold py-6">
        "Why We're Your Best Option"
      </h2>

      <div className="grid md:grid-cols-3 sm:gap-8 gap-3">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-48 h-48 mb-3">
            <img
              src={img3}
              alt="Select a car"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3">Select A Car</h3>
          <p className="text-gray-600">
            Discover our wide range of cars. All the cars designed to meet all
            your travel needs. From a diverse fleet of vehicles to flexible
            rental plans.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative w-48 h-48 mb-3">
            <img
              src={img2}
              alt="Contact operator"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3">Contact Operator</h3>
          <p className="text-gray-600">
            After you select a car, you can contact us by call or mail us.
            Within sometimes Speedboyz connect with you for further actions.
          </p>
        </div>

        <div className="flex flex-col items-center text-center rounded-md">
          <div className="relative w-48 h-48 mb-3">
            <img
              src={img1}
              alt="Let's drive"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold mb-3">Let's Drive</h3>
          <p className="text-gray-600">
            Get behind the wheel and experience the freedom of the open road.
            Let's drive a car and make every mile memorable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanYourTrip;
