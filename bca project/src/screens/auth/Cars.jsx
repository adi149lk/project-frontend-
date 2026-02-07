import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdAddCircle, MdDeleteOutline } from "react-icons/md";
import { FaEdit, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import confirmDelete from "../../components/AdminSideComponents/Reusable Functions/ConfirmDelete";

function Cars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [fuelPolicy, setFuelPolicy] = useState("");
  const [category, setCategory] = useState("");

  //Function to get all the cars
  const getAllCars = () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  //Function to delete a car
  const deleteCar = (carId) => {
    setLoading(true);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/car/delete-car/${carId}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Car deleted successfully",
          showConfirmButton: true,
          timer: 1500,
        });
        setLoading(false);
        getAllCars();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCars();
  }, []);

  //Pagination Functionality
  const bookingsPerPage = 10; //Maximum 10 bookings will be displayed in a page
  const totalPages = Math.ceil(filteredCars.length / bookingsPerPage); //Total number of pages

  //Getting data of current page
  const currentCars = filteredCars.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  useEffect(() => {
    const filteredCars = cars?.filter((car) => {
      const matchesSearch =
        car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.manufacturer?.toLowerCase().includes(searchTerm) ||
        String(car.year).includes(searchTerm);

      const matchesFuelPolicy = fuelPolicy
        ? car?.fuelPolicy === fuelPolicy
        : true;

      const matchesCategory = category ? car.category === category : true;
      return matchesSearch && matchesFuelPolicy && matchesCategory;
    });
    setFilteredCars(filteredCars);
  }, [category, fuelPolicy, searchTerm, cars]);

  //Function to handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //Function to handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="m-4 md:m-6">
      <h1 className="tracking-wide py-1 rounded-lg text-3xl font-bold text-primaryColor">
        Cars
      </h1>

      <div className="flex justify-between my-4 items-center">
        <div className="flex gap-2  relative">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border w-[100%] lg:w-auto border-gray-300 rounded-lg p-2 pl-8 pr-10 text-primaryTextColor focus:outline-none focus:ring focus:ring-red-200"
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primaryColor" />
        </div>

        <div className="flex gap-4 items-center">
          {/* Filtering according to category */}

          <select
            name="category"
            id=""
            className="border w-[100%] lg:w-auto border-gray-300 rounded-lg p-2 pl-8 pr-10 text-primaryTextColor focus:outline-none focus:ring focus:ring-red-200 "
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
            <option value="Mini">Mini</option>
          </select>
          {/* Filtering according to fuel policy */}
          <select
            name="fuelPolicy"
            id=""
            className="border w-[100%] lg:w-auto border-gray-300 rounded-lg p-2 pl-8 pr-10 text-primaryTextColor focus:outline-none focus:ring focus:ring-red-200 "
            onChange={(e) => setFuelPolicy(e.target.value)}
          >
            <option value="">Select Fuel Policy</option>
            <option value="Full to Full">Full to Full</option>
            <option value="Same Level">Same Level</option>
          </select>
          {/* Add Car Button */}
          <MdAddCircle
            onClick={() => navigate("/addCar")}
            className="rounded-lg cursor-pointer text-primaryColor float-right"
            size={40}
          />
        </div>
      </div>

      {/* Cars Table goes here */}
      <div className="overflow-x-auto min-h-[70vh]">
        <table className="min-w-full overflow-y-visible bg-white border-red-200 rounded-md ">
          <thead>
            <tr className="bg-red-50">
              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor rounded-tl-xl">
                Sl
              </th>
              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor ">
                Reg No.
              </th>
              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor  ">
                Model
              </th>
              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor  ">
                Category
              </th>

              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor  ">
                Capacity
              </th>

              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor  ">
                Fare per km
              </th>
              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor ">
                Fuel Policy
              </th>
              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor  ">
                Available
              </th>
              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor rounded-tr-xl">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="font-medium text-[13px] text-[#202224] tracking-wide">
            {loading ? (
              //  Skeleton Loader
              [...Array(10)].map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 animate-pulse"
                >
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-3/4"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/2"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded "></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/4"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/4"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/4"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/3"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/4"></div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/4"></div>
                  </td>
                </tr>
              ))
            ) : currentCars?.length > 0 ? (
              currentCars.map((car, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 relative  text-sm text-primaryTextColor">
                    {(currentPage - 1) * bookingsPerPage + index + 1}
                  </td>

                  <td className="py-4 px-6 relative text-sm text-primaryTextColor">
                    {car.registrationNumber}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {car.manufacturer} {car.model} {car.year}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {car.category}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {car.capacity}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {car.farePerKm}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {car.fuelPolicy}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor ">
                    {car.isAvailable ? "Yes" : "No"}
                  </td>
                  <td className="py-4 px-6  text-sm hover:text-primaryTextColor text-secondaryTextColor  mt-4 relative ">
                    <div className="relative flex gap-2 items-center text-center">
                      <FaEdit
                        size={20}
                        onClick={() => navigate(`/editCar/${car._id}`)}
                        className="cursor-pointer text-green-500 transition-transform hover:scale-105 duration-100 ease-in-out hover:text-green-600"
                      />
                      <MdDeleteOutline
                        size={20}
                        onClick={() => confirmDelete(car._id, deleteCar)}
                        className="cursor-pointer text-red-500 transition-transform hover:scale-105 duration-100 ease-in-out hover:text-red-600"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="py-40 px-6 text-lg text-center text-secondaryTextColor"
                >
                  No Cars available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="float-right flex gap-4 text-secondaryTextColor my-2 text-md items-center">
          <p className="">
            {currentPage} - {totalPages} pages
          </p>

          <div className="flex gap-2 ">
            <button
              className="border-2 px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-400"
              onClick={handlePrevPage}
            >
              prev
            </button>
            <button
              className="border-2 px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-400"
              onClick={handleNextPage}
            >
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cars;
