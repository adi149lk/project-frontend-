import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import loadingGif from "../../Assets/Loader/Loader.gif"; // Import your loader GIF
import { Loader } from "./Loader";

const PageLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Start loading when location changes

    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after a short delay (simulate loading time)
    }, 800); // Adjust timing as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, [location]);

  return (
    loading && (
      <div className="loader h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  );
};

export default PageLoader;
