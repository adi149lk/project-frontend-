import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAddCircle, MdDeleteOutline } from "react-icons/md";
import { FaEdit, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import confirmDelete from "../../components/AdminSideComponents/Reusable Functions/ConfirmDelete";
import UpdateStatusModal from "../../components/AdminSideComponents/Booking/UpdateStatusModal";

const Booking = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); //Current page is initialized to 1
  const [bookingStatus, setBookingStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});

  //Function to get all bookings
  const getAllBookings = () => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/booking/get-all-bookings`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response of getAllBookings: ", response.data);
        setBookings(response.data.bookings);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  //Function to delete a booking
  const deleteBooking = (bookingId) => {
    setLoading(true);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/booking/delete-booking/${bookingId}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Booking deleted successfully",
          showConfirmButton: true,
          timer: 1500,
        });
        setLoading(false);
        getAllBookings();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  console.log("allBookings: ", bookings);
  console.log("Length of bookings: ", bookings.length);

  useEffect(() => {
    getAllBookings();
  }, []);

  //Filtering according to booking status and search term
  useEffect(() => {
    if (!bookings) return;

    const updatedFilteredBookings = bookings.filter((booking) => {
      const matchesSearch =
        booking.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phoneNo?.includes(searchTerm);

      const matchesStatus = bookingStatus
        ? booking.bookingStatus.toLowerCase() === bookingStatus.toLowerCase()
        : true;

      return matchesSearch && matchesStatus;
    });

    setFilteredBookings(updatedFilteredBookings);
  }, [bookingStatus, searchTerm, bookings]);

  //Pagination Functionality
  const bookingsPerPage = 10; //Maximum 10 bookings will be displayed in a page
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage); //Total number of pages

  //Getting data of current page
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

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
    <div className="m-4 md:m-6 flex flex-col">
      {/* Update Booking Status Modal */}
      {updateStatus && (
        <UpdateStatusModal
          booking={selectedBooking}
          getAllBookings={getAllBookings}
          onClose={() => setUpdateStatus(false)}
        />
      )}
      <h1 className="tracking-wide mb-2 py-1 rounded-lg text-3xl font-bold text-primaryColor">
        Bookings
      </h1>

      <div className="flex justify-between my-4 items-center">
        <div className="flex gap-2 relative">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border w-[100%] lg:w-auto border-gray-300 rounded-lg p-2 pl-8 pr-10 text-primaryTextColor focus:outline-none focus:ring focus:ring-red-200"
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primaryColor" />
        </div>

        <div className="flex gap-4 items-center">
          <select
            name="bookingStatus"
            id=""
            className="border w-[100%] lg:w-auto border-gray-300 rounded-lg p-2 pl-8 pr-10 text-primaryTextColor focus:outline-none focus:ring focus:ring-red-200 "
            onChange={(e) => setBookingStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="finished">Finished</option>
            <option value="canceled">Canceled</option>
          </select>
          <MdAddCircle
            onClick={() => navigate("/createBooking")}
            className="rounded-lg cursor-pointer text-primaryColor float-right"
            size={40}
          />
        </div>
      </div>

      {/* Bookings Table goes here */}
      <div className="overflow-x-auto min-h-[70vh]">
        <table className="min-w-full overflow-y-visible bg-white border-red-200 ">
          <thead>
            <tr className="bg-red-50">
              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor rounded-tl-xl">
                Sl
              </th>

              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor ">
                Name
              </th>
              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor  ">
                Phone
              </th>

              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor  ">
                Car Name
              </th>

              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor  ">
                Duration
              </th>

              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor  ">
                Start Place
              </th>

              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor ">
                End Place
              </th>

              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor ">
                Status
              </th>

              <th className="py-3 px-6 text-left text-[14px] font-semibold text-primaryTextColor rounded-tr-xl">
                Actions
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
                    <div className="h-4  bg-skeletonLoaderColor rounded"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/2"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded "></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-2/3"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-2/3"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-2/3"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/2"></div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4  bg-skeletonLoaderColor rounded w-1/2"></div>
                  </td>
                </tr>
              ))
            ) : currentBookings?.length > 0 ? (
              currentBookings.map((booking, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {(currentPage - 1) * bookingsPerPage + index + 1}
                  </td>

                  <td className="py-4 px-6 relative flex flex-col text-sm text-primaryTextColor">
                    {booking.fullName}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {booking.phoneNo}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {booking.bookingDetails?.carDetails?.carName}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {new Date(booking.bookingDetails?.carDetails?.startDate)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}{" "}
                    <span className="text-primaryColor">to</span>{" "}
                    {new Date(booking.bookingDetails?.carDetails?.endDate)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor">
                    {booking.bookingDetails?.carDetails?.travelStartPlace}
                  </td>

                  <td className="py-4 px-6 text-sm text-primaryTextColor ">
                    {booking.bookingDetails?.carDetails?.travelEndPlace}
                  </td>

                  <td className="py-4 px-6 text-xs text-primaryTextColor">
                    {booking.bookingStatus === "active" && (
                      <span
                        className="bg-orange-500 rounded-lg text-white px-2 py-1 cursor-pointer hover:bg-orange-700"
                        onClick={() => {
                          setUpdateStatus(true);
                          setSelectedBooking(booking);
                        }}
                      >
                        Active
                      </span>
                    )}
                    {booking.bookingStatus === "canceled" && (
                      <span className="bg-red-500 hover:bg-red-300 rounded-lg text-center text-white px-2 py-1 cursor-not-allowed ">
                        Canceled
                      </span>
                    )}
                    {booking.bookingStatus === "finished" && (
                      <span className="bg-green-500 hover:bg-green-300 rounded-lg text-center text-white px-2 py-1 cursor-not-allowed">
                        Finished
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6  text-sm hover:text-primaryTextColor text-secondaryTextColor  mt-4 relative ">
                    <div className="relative flex gap-2 items-center text-center">
                      <FaEdit
                        size={20}
                        onClick={() => navigate(`/editBooking/${booking._id}`)}
                        className="cursor-pointer text-green-500 transition-transform hover:scale-105 duration-100 ease-in-out hover:text-green-600"
                      />
                      <MdDeleteOutline
                        size={20}
                        onClick={() =>
                          confirmDelete(booking._id, deleteBooking)
                        }
                        className="cursor-pointer text-red-500 transition-transform hover:scale-105 duration-100 ease-in-out hover:text-red-600"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-40 px-6 text-lg text-center text-secondaryTextColor"
                >
                  No bookings available
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
};

export default Booking;
