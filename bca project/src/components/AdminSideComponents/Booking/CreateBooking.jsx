import React, { useEffect, useState } from "react";
import { BiLeftArrowCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonLoader from "../../common/ButtonLoader";
import sendMail from "../../../utils/sendMail";

function CreateBooking() {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //React Hook Form initialization
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  //Function to get all the cars
  const getAllCars = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/car/get-all-cars`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response of getAllCars: ", response.data);
        setCars(response.data.cars);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCars();
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    const formData = {
      name: data.fullName,
      mail: data.email,
      startDate: new Date(data.bookingDetails.carDetails.startDate)
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-"),
      endDate: new Date(data.bookingDetails.carDetails.endDate)
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-"),
      pickup: data.bookingDetails.carDetails.travelStartPlace,
      destination: data.bookingDetails.carDetails.travelEndPlace,
    };
    console.log("Form Data: ", formData);
    const finalData = {
      ...data,
      country: "India",
      password: data?.phoneNo,
      bookingFor: "own",
      bookingDetails: {
        totalPrice: 0,
        paymentMode: "offline",
        paymentStatus: "pay later",
        advancePayment: 0,
        carDetails: {
          ...data.bookingDetails.carDetails,
        },
      },
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/booking/create-booking`,
      headers: {
        "Content-Type": "application/json",
      },
      data: finalData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response of onSubmit: ", response.data);
        sendMail(formData);
        setLoading(false);
        navigate("/bookings");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Booking created successfully",
          showConfirmButton: true,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="m-4 md:m-6 bg-white">
      <div className="flex items-center">
        <button onClick={() => navigate("/bookings")}>
          <BiLeftArrowCircle size={28} className="text-primaryColor" />
        </button>
        <h1 className="tracking-wide px-2 py-1 rounded-lg text-3xl font-bold text-primaryColor">
          Create Booking
        </h1>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-primaryTextColor"
            >
              Name
            </label>

            <input
              type="text"
              id="fullName"
              placeholder="Enter Name "
              {...register("fullName", {
                required: "Name is required",
              })}
              className={`mt-1 p-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-lg w-full`}
            />

            {errors.fullName && (
              <span className="text-red-500 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Phone No */}
          <div>
            <label
              htmlFor=""
              className="text-sm font-medium text-primaryTextColor"
            >
              Phone No
            </label>

            <input
              type="tel"
              id="phoneNo"
              placeholder="Enter Phone No"
              {...register("phoneNo", {
                required: "Phone No is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid Mobile Number",
                },
              })}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 10);
              }}
              className={`mt-1 p-2 border ${
                errors.phoneNo ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.phoneNo && (
              <span className="text-red-500 text-sm">
                {errors.phoneNo.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-primaryTextColor"
            >
              Email
            </label>

            <input
              type="text"
              id="email"
              placeholder="Enter email "
              {...register("email", {
                required: "Email is required",
              })}
              className={`mt-1 p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor=""
              className="text-sm font-medium text-primaryTextColor"
            >
              Address
            </label>

            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              {...register("address", {
                required: "Address is required",
              })}
              className={`mt-1 p-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* State */}
          <div>
            <label
              htmlFor="state"
              className="text-sm font-medium text-primaryTextColor"
            >
              State
            </label>

            <input
              type="text"
              id="state"
              placeholder="Enter State "
              {...register("state", {
                required: "State is required",
              })}
              className={`mt-1 p-2 border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.state && (
              <span className="text-red-500 text-sm">
                {errors.state.message}
              </span>
            )}
          </div>

          {/* Total Persons */}
          <div>
            <label
              htmlFor="totalPersons"
              className="text-sm font-medium text-primaryTextColor"
            >
              Total Persons
            </label>

            <input
              type="number"
              id="totalPersons"
              min={1}
              placeholder="Enter Total Persons "
              {...register("totalPersons", {
                required: "Total Persons is required",
              })}
              className={`mt-1 p-2 border ${
                errors.totalPersons ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.totalPersons && (
              <span className="text-red-500 text-sm">
                {errors.totalPersons.message}
              </span>
            )}
          </div>

          {/* Car */}
          <div>
            <label
              htmlFor="carName"
              className="text-sm font-medium text-primaryTextColor"
            >
              Car
            </label>

            <input
              type="text"
              id="carName"
              placeholder="Enter Car Name "
              {...register("bookingDetails.carDetails.carName", {
                required: "Car Name is required",
              })}
              className={`mt-1 p-2 border ${
                errors.bookingDetails?.carDetails?.carName
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded w-full`}
            />

            {errors.bookingDetails?.carDetails?.carName && (
              <span className="text-red-500 text-sm">
                {errors.bookingDetails?.carDetails?.carName?.message}
              </span>
            )}
          </div>

          {/* Select Car */}
          <div>
            <label
              htmlFor="carName"
              className="text-sm font-medium text-primaryTextColor"
            >
              Select Car
            </label>

            <select
              name="carId"
              id="carId"
              {...register("bookingDetails.carDetails.carId", {
                required: "Please select a car",
              })}
              className={`mt-1 p-2 border ${
                errors.bookingDetails?.carDetails?.carId
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded w-full`}
            >
              <option value="">Select a Car</option>
              {cars?.map((car, index) => (
                <option key={index} value={car._id}>
                  {car.manufacturer} {car.model} {car.year}
                </option>
              ))}
            </select>

            {errors.bookingDetails?.carDetails?.carId && (
              <span className="text-red-500 text-sm">
                {errors.bookingDetails?.carDetails?.carId?.message}
              </span>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="text-sm font-medium text-primaryTextColor"
            >
              Start Date & Time
            </label>

            <input
              type="datetime-local"
              id="startDate"
              placeholder="Enter Start Date "
              {...register("bookingDetails.carDetails.startDate", {
                required: "Start Date is required",
              })}
              className={`mt-1 p-2 border ${
                errors.bookingDetails?.carDetails?.startDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded w-full`}
            />

            {errors.bookingDetails?.carDetails?.startDate && (
              <span className="text-red-500 text-sm">
                {errors.bookingDetails?.carDetails?.startDate.message}
              </span>
            )}
          </div>

          {/* Booking Duration */}
          {/* <div>
            <label
              htmlFor="bookingDuration"
              className="text-sm font-medium text-primaryTextColor"
            >
              Booking Duration
            </label>

            <input
              type="number"
              id="bookingDuration"
              placeholder="Enter End Date "
              min={1}
              {...register("bookingDetails.carDetails.bookingDuration", {
                required: "End Date is required",
              })}
              className={`mt-1 p-2 border ${
                errors.bookingDetails?.carDetails?.bookingDuration
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded w-full`}
            />

            {errors.bookingDetails?.carDetails?.bookingDuration && (
              <span className="text-red-500 text-sm">
                {errors.bookingDetails?.carDetails?.bookingDuration.message}
              </span>
            )}
          </div> */}

          <div>
            <label
              htmlFor="endDate"
              className="text-sm font-medium text-primaryTextColor"
            >
              End Date and Time
            </label>

            <input
              type="datetime-local"
              id="endDate"
              placeholder="Enter End Date "
              {...register("bookingDetails.carDetails.endDate", {
                required: "Start Date is required",
              })}
              className={`mt-1 p-2 border ${
                errors.bookingDetails?.carDetails?.endDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded w-full`}
            />

            {errors.bookingDetails?.carDetails?.endDate && (
              <span className="text-red-500 text-sm">
                {errors.bookingDetails?.carDetails?.endDate.message}
              </span>
            )}
          </div>

          {/* Start Place */}
          <div>
            <label
              htmlFor="travelStartPlace"
              className="text-sm font-medium text-primaryTextColor"
            >
              Start Place
            </label>

            <input
              type="text"
              id="travelStartPlace"
              placeholder="Enter Start Place "
              {...register("bookingDetails.carDetails.travelStartPlace", {
                required: "Travel Start Place is required",
              })}
              className={`mt-1 p-2 border ${
                errors.bookingDetails?.carDetails?.travelStartPlace
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded w-full`}
            />

            {errors.bookingDetails?.carDetails?.travelStartPlace && (
              <span className="text-red-500 text-sm">
                {errors.bookingDetails?.carDetails?.travelStartPlace.message}
              </span>
            )}
          </div>

          {/* End Place */}
          <div>
            <label
              htmlFor="travelEndPlace"
              className="text-sm font-medium text-primaryTextColor"
            >
              End Place
            </label>

            <input
              type="text"
              id="travelEndPlace"
              placeholder="Enter End Place "
              {...register("bookingDetails.carDetails.travelEndPlace", {
                required: "Start Place is required",
              })}
              className={`mt-1 p-2 border ${
                errors.bookingDetails?.carDetails?.travelEndPlace
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded w-full`}
            />

            {errors.bookingDetails?.carDetails?.travelEndPlace && (
              <span className="text-red-500 text-sm">
                {errors.bookingDetails?.carDetails?.travelEndPlace.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate("/bookings")}
            className="bg-gray-200 hover:bg-gray-300 text-black p-2 rounded text-lg"
          >
            Cancel
          </button>

          {/* Submit Button */}
          {loading ? (
            <button className="w-full h-12 flex justify-center items-center bg-primaryBtnColor text-white rounded-md tracking-wide transition duration-200 hover:bg-primaryBtnHoverColor">
              <ButtonLoader />
            </button>
          ) : (
            <button className="bg-primaryColor hover:bg-primaryBtnHoverColor text-white p-2 rounded text-lg">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateBooking;
