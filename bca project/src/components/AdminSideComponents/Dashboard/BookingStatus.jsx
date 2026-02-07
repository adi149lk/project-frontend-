import React from "react";
import ApexCharts from "react-apexcharts";

const BookingStatus = ({ data }) => {
  const series = data;
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Successful", "Active", "Cancelled"],
    colors: ["#07e500", "#ffa500", "#ff2323"],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return (
    <div>
      <ApexCharts options={options} series={series} type="donut" height={350} />
    </div>
  );
};

export default BookingStatus;
