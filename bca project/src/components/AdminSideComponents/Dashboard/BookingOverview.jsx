// import React from "react";
// import Chart from "react-apexcharts";

// const BookingOverview = () => {
//   const chartOptions = {
//     chart: {
//       type: "bar",
//       height: "100%",
//       //   width: "%",
//       toolbar: {
//         show: false,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false, // Keep bars vertical
//         columnWidth: "30%", // Adjust the width as a percentage or set a specific pixel value
//         borderRadius: 3,
//         borderRadiusTop: 10,
//       },
//     },
//     yaxis: {
//       title: {
//         text: "Units",
//         style: {
//           fontSize: "14px",
//           fontWeight: "bold",
//           fontFamily: "Arial, sans-serif",
//         },
//       },
//     },
//     xaxis: {
//       title: {
//         text: "Days",
//         style: {
//           fontSize: "14px",
//           fontWeight: "bold",
//           fontFamily: "Arial, sans-serif",
//         },
//       },
//       categories: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
//     },

//     stroke: {
//       curve: "smooth", // Makes the line smooth
//     },

//     grid: {
//       show: true, // Ensure grid lines are visible
//     },
//     colors: ["#ff5757"],
//   };

//   const chartSeries = [
//     {
//       name: "Units",
//       data: [40, 10, 30, 65, 20, 75, 100], // Example earnings data
//     },
//   ];

//   return (
//     <Chart
//       options={chartOptions}
//       series={chartSeries}
//       type="bar"
//       height="100%"
//     />
//   );
// };

// export default BookingOverview;

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const BookingOverview = ({ bookings }) => {
  const [weeklyBookings, setWeeklyBookings] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    // Get the current date
    const today = new Date();

    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = today.getDay();

    // Calculate the date of the last Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    monday.setHours(0, 0, 0, 0);

    // Calculate the date of next Sunday (end of the week)
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const dayCounts = new Array(7).fill(0); // Initialize array for 7 days (Mon-Sun)

    bookings.forEach((booking) => {
      const bookingDate = new Date(booking.createdAt);

      // Check if the booking is within the current week
      if (bookingDate >= monday && bookingDate <= sunday) {
        const dayIndex = bookingDate.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Adjust index to start with Monday as 0
        const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
        dayCounts[adjustedIndex]++;
      }
    });

    setWeeklyBookings(dayCounts);
  }, [bookings]);

  const chartOptions = {
    chart: {
      type: "bar",
      height: "100%",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 3,
      },
    },
    yaxis: {
      title: {
        text: "Bookings",
        style: { fontSize: "14px", fontWeight: "bold" },
      },
    },
    xaxis: {
      title: {
        text: "Days",
        style: { fontSize: "14px", fontWeight: "bold" },
      },
      categories: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    },
    grid: { show: true },
    colors: ["#ff5757"],
  };

  const chartSeries = [{ name: "Bookings", data: weeklyBookings }];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height="100%"
    />
  );
};

export default BookingOverview;
