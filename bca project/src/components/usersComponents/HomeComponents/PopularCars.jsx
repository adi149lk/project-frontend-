import React, { useEffect } from "react";
import fuelIcon from "../../../Assets/Home/fuelTypeIcon.png";
import seatIcon from "../../../Assets/Home/seatIcon.png";
import gearIcon from "../../../Assets/Home/gearIcon.png";
import tankIcon from "../../../Assets/Home/tankIcon.png";
import { FaWhatsapp } from "react-icons/fa6";
import { GiKeyCard } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "aos/dist/aos.css";

import AOS from "aos";

const ITEMS_PER_PAGE = 6;

const CarCard = ({ data = [] }) => {
  const navigate = useNavigate();
  return (
    <>
      {data?.cars?.map((car) => {
        return (
          <div
            key={car?._id}
            className="bg-white rounded-lg shadow-xl hover:scale-[1.02] transition duration-200"
          >
            <div className="relative">
              {car?.status && (
                <span
                  className={`absolute top-5 right-6 px-2 py-1 rounded text-xs ${
                    car?.status === "Available"
                      ? "bg-green-100 text-green-600 rounded-2xl"
                      : car?.status === "Booked"
                      ? "bg-red-100 text-red-600 rounded-2xl"
                      : ""
                  }`}
                >
                  {car?.status}
                </span>
              )}
              <div
                className="border rounded-lg flex items-center justify-center m-2 h-68"
                data-aos="fade-up"
              >
                <img
                  src={car?.imagesUrls[0]}
                  alt={car?.name}
                  className="w-full h-60 object-fill"
                />
              </div>
            </div>
            <h4
              className="text-primaryTextColor font-bold text-lg pt-3 text-center"
              data-aos="fade-down"
            >
              {car?.manufacturer} {car?.model} ({car?.category}) {car?.year}
            </h4>
            {/* prices */}
            <div
              className="flex justify-between border-b mx-8 py-4"
              data-aos="fade-left"
            >
              {car?.farePerHour?.map((i) => {
                return (
                  <>
                    <div>
                      <p className="text-[#FF968E] text-sm font-normal">
                        {i?.hour}-hrs
                      </p>
                      <h4 className="text-[#474343] font-semibold text-sm">
                        ₹{i?.fare}
                      </h4>
                    </div>
                  </>
                );
              })}
            </div>

            <div
              className="flex justify-between border-b mx-8 py-4"
              data-aos="fade-right"
            >
              <div>
                <p className="text-[#FF968E] text-sm font-normal">Kilometer</p>
                <h4 className="text-[#474343] font-semibold text-sm">
                  {car?.kmPerDay}/day
                </h4>
              </div>
              <div>
                <p className="text-[#FF968E] text-sm font-normal">Extra Km</p>
                <h4 className="text-[#474343] font-semibold text-sm">
                  ₹{car?.extraChargePerKm}/km
                </h4>
              </div>
              <div>
                <p className="text-[#FF968E] text-sm font-normal">Extra Hr</p>
                <h4 className="text-[#474343] font-semibold text-sm">
                  {" "}
                  ₹{car?.extraChargePerHour}
                </h4>
              </div>
            </div>
            {/*Types */}
            <div
              className="flex justify-between mx-8 py-4"
              data-aos="fade-left"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <img src={fuelIcon} alt="fueltype Icon" className="w-7" />
                <p className="text-[#616161] text-xs">{car?.fuelType}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <img src={seatIcon} alt="seat Icon" className="w-7" />
                <p className="text-[#616161] text-xs">{car?.capacity} people</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <img src={gearIcon} alt="transmission Icon" className="w-7" />
                <p className="text-[#616161] text-xs">{car?.transmission}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <img src={tankIcon} alt="tank Icon" className="w-7" />
                <p className="text-[#616161] text-xs">
                  {/* {car?.specs?.tankCapacity} */}
                  {car?.color}
                </p>
              </div>
            </div>
            {/* last two button */}
            <div className="grid grid-cols-2 rounded-b-lg">
              <button
                className="py-3 flex items-center justify-center text-white bg-[#075E54] hover:bg-[#2a776e] rounded-bl-lg cursor-pointer"
                onClick={() => {
                  const message = `Name:%0ANumber:%0APick%20up%20location:%0AMail_id:`;
                  window.location.href = `https://wa.me/9348994082?text=${message}`;
                }}
              >
                <FaWhatsapp size={28} />
              </button>
              <button
                className="py-3 flex items-center justify-center text-white bg-primaryBtnColor hover:bg-primaryBtnHoverColor rounded-br-lg cursor-pointer"
                onClick={() => {
                  const carDetails = {
                    manufacturer: car?.manufacturer,
                    model: car?.model,
                    type: car?.category,
                    id: car?._id,
                    image: car?.imagesUrls[0],
                  };
                  console.log("Storing car details:", carDetails);

                  localStorage.setItem(
                    "carDetails",
                    JSON.stringify(carDetails)
                  );

                  window?.scrollTo({ top: 0, behavior: "smooth" });
                  navigate(`/booking/${car?._id}`);
                }}
              >
                <span className="text-lg">Book now</span>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export const PopularCars = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  const [selectedButton, setSelectedButton] = useState("All Cars");
  const [loading, setLoading] = useState(true);

  const [cars, setCars] = useState({ cars: [] });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/car/get-all-cars`,
      headers: {},
    };
    setLoading(true);

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response?.data));
        setCars(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log("cars", cars);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const displayedCars = {
    cars:
      cars?.cars?.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ) || [],
  };

  const totalPages = Math.ceil((cars?.cars?.length || 0) / ITEMS_PER_PAGE);

  return (
    <div
      id="popular-cars"
      className="w-full  xl:px-20 md:px-12 px-6  font-geologica"
    >
      <div
        className="bg-red-100 rounded-xl sm:w-[15%] mx-auto w-full"
        data-aos="fade-up-right"
      >
        <p className="text-xs sm:text-sm px-4 sm:px-3 py-1 text-[#FF2C3B]  uppercase text-center">
          Popular Cars
        </p>
      </div>
      <h2
        className="text-center text-xl md:text-3xl xl:text-5xl text-[#242424] font-bold py-6"
        data-aos="fade-up-left"
      >
        Choose which one you like !
      </h2>
      <div className="w-full mx-auto  py-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <CarCardSkeleton count={6} />
          ) : (
            <CarCard data={displayedCars} />
          )}
        </div>
        {!loading && cars?.cars?.length > 0 && (
          <div className="flex justify-center items-center">
            <Stack spacing={2} className="flex justify-center mt-6">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

const CarCardSkeleton = ({ count = 3 }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-xl animate-pulse">
        <div className="relative">
          <div className="absolute top-5 right-6 w-20 h-6 bg-gray-300 rounded-2xl" />
          <div className="border rounded-lg m-2 h-60 bg-gray-300" />
        </div>

        <div className="flex justify-center pt-3">
          <div className="h-6 bg-gray-300 rounded w-3/4" />
        </div>

        <div className="flex justify-between border-b mx-8 py-4">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-12 bg-gray-300 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-12 bg-gray-300 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-12 bg-gray-300 rounded" />
          </div>
        </div>

        <div className="flex justify-between border-b mx-8 py-4">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-12 bg-gray-300 rounded" />
          </div>
        </div>

        <div className="flex justify-between mx-8 py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 bg-gray-300 rounded" />
            <div className="h-3 w-14 bg-gray-300 rounded" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 bg-gray-300 rounded" />
            <div className="h-3 w-14 bg-gray-300 rounded" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 bg-gray-300 rounded" />
            <div className="h-3 w-14 bg-gray-300 rounded" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 bg-gray-300 rounded" />
            <div className="h-3 w-14 bg-gray-300 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 rounded-b-lg">
          <div className="py-3 bg-gray-300 rounded-bl-lg" />
          <div className="py-3 bg-gray-300 rounded-br-lg" />
        </div>
      </div>
    ));
};
