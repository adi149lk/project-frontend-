import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlineLocalPhone } from "react-icons/md";

const ContactDetails = () => {
  return (
    <div className="py-12 bg-white font-geologica">
      <div className="text-center mb-28">
        <div className="bg-red-100 rounded-xl sm:w-[15%] mx-auto w-full my-6">
          <p className="text-xs sm:text-sm px-4 sm:px-6 py-1 text-red-600 font-semibold uppercase text-center">
            Contact Details
          </p>
        </div>
        <h2 className="lg:text-5xl sm:text-4xl text-3xl font-semibold text-gray-800">
          Contact Informations
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 xl:max-w-7xl lg:max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Location Card */}
        <div className="relative bg-white shadow-xl rounded-2xl p-6 text-center">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-3xl p-3 w-16 h-16 rounded-lg flex items-center justify-center shadow-md">
            <SlLocationPin className="h-8 w-9" />
          </div>
          <h4 className="font-semibold text-xl mt-10 mb-2">Our Location</h4>
          <p className="text-gray-600">
            Kalinga Bihar, Patrapada, Bhubaneswar, Odisha, 769015
          </p>
        </div>

        {/* Email Card */}
        <div className="relative bg-white shadow-xl rounded-2xl p-6 text-center">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-3xl p-3 w-16 h-16 rounded-lg flex items-center justify-center shadow-md">
            <HiOutlineMailOpen className="h-8 w-9" />
          </div>
          <h4 className="font-semibold text-xl mt-10 mb-2">Email Address</h4>
          <p className="text-gray-600">speedtoyz2@gmail.com</p>
        </div>

        {/* Phone Card */}
        <div className="relative bg-white shadow-xl rounded-2xl p-6 text-center">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-3xl p-3 w-16 h-16 rounded-lg flex items-center justify-center shadow-md">
            <MdOutlineLocalPhone className="h-8 w-9" />
          </div>
          <h4 className="font-semibold text-xl mt-10 mb-2">Phone Number</h4>
          <p className="text-gray-600">Emergency Cases</p>
          <p className="text-gray-600">+91 9938848434 (24/7)</p>
          <p className="text-gray-600">+91 9348994082 (24/7)</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
