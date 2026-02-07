import React, { useEffect, useState } from "react";
import fuelIcon from "../../../Assets/Home/fuelTypeIcon.png";
import seatIcon from "../../../Assets/Home/seatIcon.png";
import gearIcon from "../../../Assets/Home/gearIcon.png";
import tankIcon from "../../../Assets/Home/tankIcon.png";
import { FaWhatsapp } from "react-icons/fa6";
import { GiKeyCard } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { IoColorFill } from "react-icons/io5";

const ITEMS_PER_PAGE = 9;

const CarCard = ({ cars = [] }) => {
  const navigate = useNavigate();

  if (!cars.length) {
    return (
      <div className="col-span-full text-center py-8 text-gray-500">
        No cars found for this category
      </div>
    );
  }

  return (
    <>
      {cars.map((car) => (
        <div
          key={car._id}
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
            <div className="border rounded-lg flex items-center justify-center m-2 h-68">
              <img
                src={car?.imagesUrls[0]}
                alt={car?.name}
                className="w-full h-60 object-fill"
              />
            </div>
          </div>
          <h4 className="text-primaryTextColor font-bold text-lg pt-3 text-center">
            {car?.manufacturer} {car?.model} ({car?.category}) {car?.year}
          </h4>
          <div className="flex justify-between border-b mx-8 py-4">
            {car?.farePerHour?.map((i, index) => (
              <div key={index}>
                <p className="text-[#FF968E] text-sm font-normal">
                  {i.hour}-hrs
                </p>
                <h4 className="text-[#474343] font-semibold text-sm">
                  ₹{i.fare}
                </h4>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-b mx-8 py-4">
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
                ₹{car?.extraChargePerHour}
              </h4>
            </div>
          </div>
          <div className="flex justify-between mx-8 py-4">
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
              <p className="text-[#616161] text-xs">{car?.color}</p>
            </div>
          </div>
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
                  image: car?.imagesUrls?.[0],
                };
                // console.log("Storing car details:", carDetails);
                console.log("Rakesh: ", car?.imagesUrls?.[0]);
                // console.log("Image URL being stored:", car?.imagesUrls?.[0]);

                localStorage.setItem("carDetails", JSON.stringify(carDetails));

                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(`/booking/${car?._id}`);
              }}
            >
              <span className="text-lg">Book now</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export const AllCars = () => {
  const [selectedButton, setSelectedButton] = useState("All Cars");
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const buttons = [
    "All Cars",
    "Mini Cars",
    "Sedan Cars",
    "Hatchback Cars",
    "Suv Cars",
    "Luxury Cars",
  ];

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    filterCars(selectedButton);
  }, [selectedButton, allCars]);

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
        setAllCars(response.data.cars || []);
        setFilteredCars(response.data.cars || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const filterCars = (buttonType) => {
    if (buttonType === "All Cars") {
      setFilteredCars(allCars);
      return;
    }

    const carType = buttonType.replace(" Cars", "").toLowerCase();
    const filtered = allCars.filter(
      (car) => car?.category?.toLowerCase() === carType
    );
    setFilteredCars(filtered);
  };

  const handlePageChange = (event, page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  const displayedCars = filteredCars?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full py-10 xl:px-20 md:px-12 px-6 pb-28 font-geologica">
      <div className="bg-gray-100 sm:p-4 p-2 max-w-7xl mx-auto rounded-lg ">
        <div className="hidden lg:flex justify-center items-center capitalize">
          <div className="max-w-7xl mx-auto flex gap-8">
            {buttons.map((buttonText) => (
              <button
                key={buttonText}
                onClick={() => {
                  setSelectedButton(buttonText);
                  // window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200
                ${
                  selectedButton === buttonText
                    ? "bg-red-500 text-white"
                    : "text-gray-700 hover:text-red-500"
                }`}
              >
                {buttonText}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:hidden flex flex-col items-center w-full capitalize">
          <select
            value={selectedButton}
            onChange={(e) => setSelectedButton(e.target.value)}
            className="bg-gray-200 p-3 rounded-lg text-gray-700 w-full"
          >
            <option value="" disabled>
              Select an option
            </option>
            {buttons.map((buttonText) => (
              <option key={buttonText} value={buttonText}>
                {buttonText}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <CarCardSkeleton count={6} />
          ) : (
            <CarCard cars={displayedCars} />
          )}
        </div>
        <div className="flex justify-center items-center">
          <Stack spacing={2} className="flex justify-center mt-6">
            <Pagination
              count={Math?.ceil(filteredCars?.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
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
