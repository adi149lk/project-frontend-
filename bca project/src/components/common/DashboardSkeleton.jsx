const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Cards Skeleton */}
      <div className="mt-2 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col p-4 rounded-lg shadow-lg bg-gray-200"
            >
              <div className="flex gap-6 items-center mb-3">
                <div className="bg-gray-300 p-3 rounded-lg w-12 h-12"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
          ))}
      </div>

      {/* Graphs and Progress Bars Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bar Graph */}
        <div className="h-64 bg-gray-200 rounded-lg"></div>

        {/* Progress Bars */}
        <div className="flex flex-col gap-4">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="h-4 bg-gray-300 rounded w-full"></div>
            ))}
        </div>

        {/* Donut Chart */}
        <div className="h-64 w-64 bg-gray-200 rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
