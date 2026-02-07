import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import "aos/dist/aos.css";

import AOS from "aos";

// Feedback Card component
const FeedbackCard = ({ feedback }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  return (
    <div className="bg-white rounded-xl border-2 p-7">
      <div className="flex text-[#FFBA07] text-xl" data-aos="fade-up">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= feedback?.ratings ? (
            <AiFillStar key={star} className="w-6 h-6 text-[#FFBA07]" />
          ) : (
            <AiOutlineStar key={star} className="w-6 h-6 text-[#FFBA07]" />
          )
        )}
      </div>
      <p
        className="text-[#616161] text-left md:leading-8 text-sm md:text-lg py-4"
        data-aos="fade-right"
      >
        {feedback.comment}
      </p>
      <div className="flex items-center justify-start gap-5 pt-8 border-t-2">
        <h4
          className="text-lg md:text-xl font-bold text-[#040401]"
          data-aos="fade-left"
        >
          {feedback.name}
        </h4>
      </div>
    </div>
  );
};

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 3;

  // Fetch feedback data from the API
  useEffect(() => {
    allFeedBacks();
  }, []);

  const allFeedBacks = () => {
    setLoading(true);
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/feedback/get-all-feedbacks`,
    };

    axios
      .request(config)
      .then((response) => {
        setAllData(response?.data?.feedbacks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // Get the current feedbacks based on the page
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = allData?.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  // Handle page navigation
  const handleNext = () => {
    if (currentPage < Math.ceil(allData?.length / feedbacksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-[#FFF8F6] text-center px-6 md:px-10 xl:px-20 pt-5 md:pt-10 pb-10">
      {/* Section Heading */}
      <p
        className="text-[#FF2C3B] text-xs md:text-sm uppercase font-semibold bg-[#ff2c3b22] inline-block px-4 py-1 rounded-full"
        data-aos="fade-up"
      >
        Testimonials
      </p>
      <h1
        className="text-xl md:text-3xl xl:text-5xl text-[#242424] font-extrabold my-5 md:w-2/3 xl:w-1/2 mx-auto"
        data-aos="fade-down"
      >
        What our customers are saying about us
      </h1>

      {/* Feedback Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-xl animate-pulse"
            >
              <div className="h-6 w-16 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6 mb-4"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10">
          {currentFeedbacks?.map((feedback, index) => (
            <FeedbackCard key={index} feedback={feedback} />
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex gap-6 justify-center mt-8">
        <button
          onClick={handlePrevious}
          className="cursor-pointer text-xl md:text-5xl text-white bg-[#FF2C3B] hover:bg-[#FF3600] rounded-full p-2"
        >
          <FaArrowLeftLong size={30} />
        </button>
        <button
          onClick={handleNext}
          className="cursor-pointer text-xl md:text-5xl text-white bg-[#FF2C3B] hover:bg-[#FF3600] rounded-full p-2"
        >
          <FaArrowRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default Feedback;
