import React, { useState } from "react";
import { FaUser, FaClock, FaCar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsTelephone } from "react-icons/bs";
import CarLogo from "../../../Assets/Images/CarFormlogo.png";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IoArrowUndoCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { LiaAddressCardSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import sendMail from "../../../utils/sendMail";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    contact: "",
    pickup: "",
    address: "",
    persons: "",
    destination: "",
    startDate: "",
    endDate: "",
    cabType: "",
    state: "",
    termsAccepted: false,
  });
  const params = useParams();
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  console.log("category", params);
  const stateData = [
    { state: "Odisha" },
    { state: "Chhattisgarh" },
    { state: "West Bengal" },
    { state: "Bihar" },
  ];

  useEffect(() => {
    const storedCarDetails = localStorage.getItem("carDetails");
    if (storedCarDetails) {
      const parsedCarDetails = JSON.parse(storedCarDetails);
      setCarDetails(parsedCarDetails);
    }
  }, []);

  console.log("carDetails: ", carDetails);
  console.log("manufacturer", carDetails.manufacturer);
  console.log("type", carDetails.type);
  console.log("model", carDetails.model);
  console.log("id", carDetails.id);
  console.log("carImage: ", carDetails.image);

  useEffect(() => {
    if (params.carType) {
      setFormData((prevData) => ({ ...prevData, cabType: params.carType }));
    }
  }, [params.carType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    setSubmitLoading(true);
    let data = JSON.stringify({
      fullName: formData?.name,
      address: formData?.address,
      phoneNo: formData?.contact,
      email: formData?.mail,
      country: "India",
      state: formData?.state,
      password: formData?.contact,
      totalPersons: formData?.persons,
      bookingFor: "own",
      bookingDetails: {
        totalPrice: 0,
        paymentMode: "offline",
        paymentStatus: "pay later",
        advancePayment: 0,
        carDetails: {
          carName: carDetails?.model,
          carId: carDetails?.id,
          startDate: formData.startDate,
          endDate: formData.endDate,
          travelStartPlace: formData.pickup,
          travelEndPlace: formData.destination,
        },
      },
    });
    setSubmitLoading(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/booking/create-booking`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        sendMail(formData);
        setSubmitLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitLoading(false);
      });

    console.log(formData);

    localStorage.removeItem("carDetails");
    setFormData({
      name: "",
      contact: "",
      pickup: "",
      startDate: "",
      termsAccepted: false,
      persons: "",
      mail: "",
      endDate: "",
      destination: "",
      address: "",
      state: "",
    });
    Swal.fire({
      title: "Booking Successful",
      icon: "success",
      draggable: true,
    }).then(() => {
      navigate("/car");
    });
  };
  console.log(params.carId);
  // console.log("formData", formData.name);
  const today = new Date().toISOString().split("T")[0];

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setFormData((prev) => ({
      ...prev,
      startDate: newStartDate,

      endDate:
        prev.endDate && new Date(newStartDate) > new Date(prev.endDate)
          ? ""
          : prev.endDate,
    }));
  };

  return (
    <div className="w-full px-6 sm:px-12 xl:px-20 mx-auto xl:pt-8 pt-3 sm:pt-3 sm:pb-24 pb-36 bg-white rounded-lg shadow flex font-geologicl flex-col-reverse xl:flex-row">
      <div className="flex-1 pr-8 flex-col sm:flex-row w-full">
        <div className="flex justify-start items-center gap-3 mb-8 w-full">
          <IoArrowUndoCircleSharp
            size={34}
            onClick={() => {
              navigate(-1);
              localStorage.removeItem("carDetails");
            }}
          />
          <h1 className="xl:text-4xl md:text-3xl text-2xl font-semibold ">
            Online Cab Booking
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center gap-8 flex-col xl:flex-row">
            <div className="relative border-b border-gray-300 group focus-within:border-black w-full focus-text-black">
              <div className="absolute left-0 top-2">
                <FaUser className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Add Your Name"
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>

            {/* Contact Number */}
            <div className="relative border-b border-gray-300 group focus-within:border-black w-full">
              <div className="absolute left-0 top-2">
                <BsTelephone className="text-gray-400" size={18} />
              </div>
              <input
                type="tel"
                value={formData.contact}
                required
                onChange={(e) => {
                  const contactNumber = e.target.value;
                  if (/^\d{0,10}$/.test(contactNumber)) {
                    setFormData({ ...formData, contact: contactNumber });
                  }
                }}
                placeholder="Contact Number"
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-700"
                maxLength={10}
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-8 xl:pt-1 pt-3 sm:pt-3 flex-col xl:flex-row">
            <div className="relative border-b border-gray-300 group focus-within:border-black w-full focus-text-black">
              <div className="absolute left-0 top-2">
                <MdOutlineEmail User className="text-gray-400" size={18} />
              </div>
              <input
                type="email"
                required
                value={formData.mail}
                onChange={(e) =>
                  setFormData({ ...formData, mail: e.target.value })
                }
                placeholder="Enter Your Email"
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>

            <div className="relative border-b border-gray-300 group focus-within:border-black w-full focus-text-black xl:pt-1 pt-3 sm:pt-3">
              <div className="absolute left-0 top-4">
                <LiaAddressCardSolid className="text-gray-400" size={22} />
              </div>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter Your Address"
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>

            {/* Time & Date */}
          </div>
          <div className="flex justify-between items-center gap-5 xl:pt-1 pt-3 sm:pt-3 flex-col xl:flex-row">
            <div className="relative border-b border-gray-300 group focus-within:border-black w-full focus-text-black xl:pt-1 pt-3 sm:pt-3">
              <div className="absolute left-0 top-4">
                <MdGroups className="text-gray-400" size={22} />
              </div>
              <input
                type="text"
                required
                value={formData.persons}
                onChange={(e) =>
                  setFormData({ ...formData, persons: e.target.value })
                }
                placeholder="No. Of Persons"
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>
            <div className="relative border-b border-gray-300 group focus-within:border-black  w-full ">
              <select
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full px-5 pr-4 py-2 bg-transparent border-none text-gray-700"
              >
                <option value="">Select Your State</option>
                {stateData.map((i, index) => (
                  <option key={index} value={i.state}>
                    {i.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cab Type */}
          <div className="flex justify-between items-center gap-5 xl:pt-1 pt-3 sm:pt-3 flex-col xl:flex-row">
            <div className="relative border-b border-gray-300 group focus-within:border-black w-full">
              <div className="absolute left-0 top-2">
                <FaLocationDot className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                required
                value={formData.pickup}
                onChange={(e) =>
                  setFormData({ ...formData, pickup: e.target.value })
                }
                placeholder="Pickup Point"
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>
            <div className="relative border-b border-gray-300 group focus-within:border-black w-full">
              <div className="absolute left-0 top-2">
                <FaLocationDot className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                required
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
                placeholder="Destination Point"
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-5 xl:pt-1 pt-3 sm:pt-3 flex-col xl:flex-row">
            <div className="relative border-b border-gray-300 group focus-within:border-black w-full">
              <div className="absolute left-0 top-2">
                <FaClock className="text-gray-400" size={18} />
              </div>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                min={today}
                onChange={handleStartDateChange}
                placeholder="Start Date"
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>

            {/* Time & Date */}
            <div className="relative border-b border-gray-300 group focus-within:border-black w-full">
              <div className="absolute left-0 top-2">
                <FaClock className="text-gray-400" size={18} />
              </div>
              <input
                type="datetime-local"
                required
                min={formData.startDate || today}
                disabled={!formData.startDate}
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                placeholder="End Date"
                className="w-full pl-8 pr-4 py-2 bg-transparent border-none focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex justify-between items-center xl:pt-2 pt-3 sm:pt-3 flex-col xl:flex-row ">
            <div className="space-y-3">
              <a className="text-gray-800 font-medium">
                <u>Terms and conditions</u>
              </a>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      termsAccepted: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <label
                  htmlFor="terms"
                  className="text-gray-600 sm:text-lg text-md"
                >
                  I agree above terms and conditions
                </label>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              type="submit"
              disabled={submitLoading}
              className={`px-8 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors ${
                submitLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitLoading ? "Please wait" : "Book Now"}
            </button>
          </div>
        </form>
      </div>

      <div className="flex relative">
        <div className=" inset-0 bg-red-500 opacity-10"></div>
        <div className="  "></div>
        <img
          src={carDetails.image}
          alt="Car"
          className="  object-contain relative z-10"
        />
      </div>
    </div>
  );
};

export default Form;
