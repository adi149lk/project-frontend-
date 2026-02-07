import React from "react";
import {
  FaArrowLeftLong,
  FaArrowRight,
  FaRegStar,
  FaStar,
} from "react-icons/fa6";
import user1 from "../../../Assets/Home/user1.png";

const Testimonials = () => {
  return (
    <div className="bg-[#FFF8F6] text-center px-6 md:px-10 xl:px-20 pt-5 md:pt-10 pb-10">
      {/* section heading */}
      <p className="text-[#FF2C3B] text-xs md:text-sm uppercase font-semibold bg-[#ff2c3b22] inline-block px-4 py-1 rounded-full">
        Testimonials
      </p>
      <h1 className="text-xl md:text-3xl xl:text-5xl text-[#242424] font-extrabold my-5 md:w-2/3 xl:w-1/2 mx-auto">
        What our customers are saying about us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10">
        <FeedbackCard />
        <FeedbackCard />
        <FeedbackCard />
      </div>
      <div className="flex gap-6 justify-center mt-8">
        <FaArrowLeftLong className="cursor-pointer text-xl md:text-5xl text-white bg-[#FF2C3B] hover:bg-[#FF3600] rounded-full p-2" />
        <FaArrowRight className="cursor-pointer text-xl md:text-5xl text-white bg-[#FF2C3B] hover:bg-[#FF3600] rounded-full p-2" />
      </div>
    </div>
  );
};

export default Testimonials;

export const FeedbackCard = () => {
  return (
    <div className="bg-white rounded-xl border-2 p-7">
      <div className="flex text-[#FFBA07] text-xl">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStar />
      </div>
      <p className="text-[#616161] text-left md:leading-8 text-sm md:text-lg py-4">
        Renting a car from nova ride was a great decision. Not only did I get a
        reliable and comfortable vehicle, but the prices were also very
        competitive.
      </p>
      <div className="flex items-center justify-start gap-5 pt-8 border-t-2">
        <img src={user1} alt="User" className="w-14" />
        <h4 className="text-lg md:text-xl font-bold text-[#040401]">
          Sidharta Das
        </h4>
      </div>
    </div>
  );
};
