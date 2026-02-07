import React from "react";

const ProgressBars = ({ data }) => {
  return (
    <div className="space-y-4 w-full">
      {data.map((item, index) => (
        <div key={index} className="my-2">
          <div className="font-semibold text-secondaryTextColor tracking-wide">
            {item.label}
          </div>
          <div className="relative pt-1">
            <div
              className="flex mb-2 rounded-md"
              style={{
                backgroundColor: "#e0e0e0",
              }}
            >
              <div
                className="bg-gray-800 rounded-md h-4"
                style={{ width: `${item.percentage}%` }}
              >
                <span className="absolute right-2 text-sm text-black font-bold">
                  {item.percentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBars;
