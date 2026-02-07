import React from "react";
import Chart from "react-apexcharts";

const EarningsLineChart = () => {
  const chartOptions = {
    chart: {
      type: "line",
      height: "100%",
      //   width: "%",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      tickAmount: 36,
    },

    stroke: {
      curve: "smooth", // Makes the line smooth
    },
    markers: {
      size: 5, // Adds dots to data points
      colors: ["#ff3443"],
    },
    grid: {
      show: true, // Ensure grid lines are visible
    },
    colors: ["#ff3443"],
  };

  const chartSeries = [
    {
      name: "Earnings",
      data: [
        5000, 7000, 8000, 12000, 15000, 11000, 24000, 18000, 12000, 8000, 21000,
        25000,
      ], // Example earnings data
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height="100%"
    />
  );
};

export default EarningsLineChart;
