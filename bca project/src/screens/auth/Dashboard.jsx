import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCarSide } from "react-icons/fa";
import { PiBookmarksSimpleFill } from "react-icons/pi";
// import EarningsLineChart from "../../components/AdminSideComponents/Dashboard/EarningChart";
import ProgressBars from "../../components/AdminSideComponents/Dashboard/PercentageBars";
import BookingOverview from "../../components/AdminSideComponents/Dashboard/BookingOverview";
import BookingStatus from "../../components/AdminSideComponents/Dashboard/BookingStatus";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { BsJournalBookmarkFill } from "react-icons/bs";
import DashboardSkeleton from "../../components/common/DashboardSkeleton";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [todaysBookings, setTodaysBookings] = useState();
  const [cars, setCars] = useState([]);
  const [sedan, setSedan] = useState();
  const [suv, setSuv] = useState();
  const [hatchBack, setHatchBack] = useState();
  const [luxury, setLuxury] = useState();
  const [mini, setMini] = useState();
  const [electric, setElectric] = useState();
  const [finished, setFinished] = useState();
  const [active, setActive] = useState();
  const [cancelled, setCancelled] = useState();

  const data = [
    { label: "Sedan", percentage: (sedan / cars.length) * 100 },
    { label: "SUV", percentage: (suv / cars.length) * 100 },
    { label: "HatchBack", percentage: (hatchBack / cars.length) * 100 },
    { label: "Luxury", percentage: (luxury / cars.length) * 100 },
    { label: "Mini", percentage: (mini / cars.length) * 100 },
    { label: "Electric", percentage: (electric / cars.length) * 100 },
  ];

  const series = [
    (finished / bookings?.length) * 100,
    (active / bookings?.length) * 100,
    (cancelled / bookings?.length) * 100,
  ];

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

  useEffect(() => {
    getAllBookings();
  }, []);

  //To know how many bookings created today and no. of bookings as per their status
  useEffect(() => {
    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0)).getTime(); // Start of today (midnight)
    const todayEnd = new Date(today.setHours(23, 59, 59, 999)).getTime(); // End of today (11:59:59 PM)

    const todaysBookings = bookings?.filter((b) => {
      const bookingTime = new Date(b.createdAt).getTime();
      return bookingTime >= todayStart && bookingTime <= todayEnd;
    });
    setTodaysBookings(todaysBookings.length);

    //No. of bookings according to their status
    const counts = bookings?.reduce(
      (acc, booking) => {
        if (booking.bookingStatus === "finished") acc.finished++;
        else if (booking.bookingStatus === "active") acc.active++;
        else if (booking.bookingStatus === "canceled") acc.canceled++;
        return acc;
      },
      { active: 0, finished: 0, canceled: 0 }
    );
    setFinished(counts.finished);
    setActive(counts.active);
    setCancelled(counts.canceled);
  }, [bookings]);

  //Function to get all cars
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

  useEffect(() => {
    getAllCars();
  }, []);

  //Counting the no of cars according to their category
  useEffect(() => {
    if (!cars) return;

    const counts = cars?.reduce(
      (acc, car) => {
        if (car.category === "Sedan") acc.sedans++;
        else if (car.category === "SUV") acc.suvs++;
        else if (car.category === "Hatchback") acc.hatchBack++;
        else if (car.category === "Luxury") acc.luxury++;
        else if (car.category === "Mini") acc.mini++;
        else if (car.category === "Electric") acc.electric++;
        return acc;
      },
      { sedans: 0, suvs: 0, hatchBack: 0, luxury: 0, mini: 0, electric: 0 }
    );
    setSedan(counts.sedans);
    setSuv(counts.suvs);
    setHatchBack(counts.hatchBack);
    setLuxury(counts.luxury);
    setMini(counts.mini);
    setElectric(counts.electric);
  }, [cars]);

  return (
    <div className="m-4 md:m-6 bg-gray-50">
      <h1 className="tracking-wide py-1 rounded-lg text-3xl font-bold text-primaryColor">
        Dashboard
      </h1>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div>
          <div className="mt-2 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center justify-between">
            <div className="flex flex-col p-4 rounded-lg shadow-lg bg-pink-50 transition-transform hover:scale-105 duration-300 ease-in-out">
              <div className="flex gap-6 items-center mb-3">
                <div className="bg-white p-3 rounded-lg">
                  <BsJournalBookmarkFill size={28} />
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-primaryTextColor tracking-wide ">
                  {bookings?.length}
                </h1>
              </div>

              <div className="flex justify-between">
                <p className="text-secondaryTextColor font-semibold tracking-wide">
                  Total Bookings
                </p>

                {/* <p className="text-secondaryTextColor font-semibold tracking-wide">
            15.2% ↑
          </p> */}
              </div>
            </div>

            <div className="flex flex-col p-4 rounded-lg shadow-lg bg-yellow-50 transition-transform hover:scale-105 duration-300 ease-in-out">
              <div className="flex gap-6 items-center mb-3">
                <div className="bg-white p-3 rounded-lg">
                  <PiBookmarksSimpleFill size={28} />
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-primaryTextColor tracking-wide ">
                  {todaysBookings}
                </h1>
              </div>

              <div className="flex justify-between">
                <p className="text-secondaryTextColor font-semibold tracking-wide">
                  Today's Bookings
                </p>

                {/* <p className="text-secondaryTextColor font-semibold tracking-wide">
            5.2% ↑
          </p> */}
              </div>
            </div>

            <div className="flex flex-col p-4 rounded-lg shadow-lg bg-orange-50 transition-transform hover:scale-105 duration-300 ease-in-out">
              <div className="flex gap-6 items-center mb-3">
                <div className="bg-white p-3 rounded-lg">
                  <BsBookmarkCheckFill size={28} />
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-primaryTextColor tracking-wide ">
                  {finished}
                </h1>
              </div>

              <div className="flex justify-between">
                <p className="text-secondaryTextColor font-semibold tracking-wide">
                  Successful Bookings
                </p>

                {/* <p className="text-secondaryTextColor font-semibold tracking-wide">
            21.2% ↑
          </p> */}
              </div>
            </div>

            <div className="flex flex-col p-4 rounded-lg shadow-lg bg-green-50 transition-transform hover:scale-105 duration-300 ease-in-out">
              <div className="flex gap-6 items-center mb-3">
                <div className="bg-white p-3 rounded-lg">
                  <FaCarSide size={28} />
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-primaryTextColor tracking-wide ">
                  {cars.length}
                </h1>
              </div>

              <div className="flex justify-between">
                <p className="text-secondaryTextColor font-semibold tracking-wide">
                  Available cars
                </p>

                {/* <p className="text-secondaryTextColor font-semibold tracking-wide">
            -7.2% ↑
          </p> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-[100%] my-8">
            <div className="w-full md:w-[40%] bg-white shadow-lg p-4 rounded-md">
              <h1 className="text-lg font-bold tracking-wide text-primaryTextColor ">
                Booking Overview
              </h1>
              <BookingOverview bookings={bookings} />
            </div>
            <div className="w-full md:w-[30%] bg-white shadow-lg p-4 rounded-md">
              <h1 className="text-lg font-bold tracking-wide text-primaryTextColor ">
                Car Type
              </h1>
              <ProgressBars data={data} />
            </div>

            <div className="w-full md:w-[30%] bg-white shadow-lg p-4 rounded-md">
              <h1 className="text-lg md:text-center  font-bold tracking-wide text-primaryTextColor mb-4">
                Booking Status
              </h1>
              <BookingStatus data={series} />
            </div>
          </div>
        </div>
      )}
      {/* <div className="h-96 my-8 bg-white shadow-lg p-2 rounded-md">
        <h1 className="text-lg font-bold tracking-wide text-primaryTextColor ">
          Earnings Summary
        </h1>
        <div className="h-full p-4">
          <EarningsLineChart />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
