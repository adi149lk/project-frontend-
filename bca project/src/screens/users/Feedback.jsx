import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import user1 from "../../Assets/Home/user1.png";
import SimpleBanner from "../../components/common/SimpleBanner";
import TopBanner from "../../Assets/Images/TopBanner.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 9;

const Feedback = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [submitLoading, setSubmitLoading] = useState(false);

  const ratings = [
    {
      rating: 1,
    },
    {
      rating: 2,
    },
    {
      rating: 3,
    },
    {
      rating: 4,
    },
    {
      rating: 5,
    },
  ];
  const [selectedRatings, setSelectedRatings] = useState([]);
  const handleCheckboxChange = (value) => {
    if (selectedRatings.includes(value)) {
      setSelectedRatings(selectedRatings.filter((item) => item !== value));
    } else {
      setSelectedRatings([...selectedRatings, value]);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedRatings: "",
    message: "",
  });

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    allFeedBacks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitLoading(true);

    let data = JSON.stringify({
      name: formData?.name,
      email: formData?.email,
      phone: formData?.phone,
      ratings: formData?.selectedRatings,
      comment: formData?.message,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/feedback/add-feedback`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response?.data));
        allFeedBacks();
        setSubmitLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitLoading(false);
      });

    setFormData({
      name: "",
      email: "",
      phone: "",
      selectedRatings: "",
      message: "",
    });
    Swal.fire({
      title: "Thank you..",
      icon: "success",
      draggable: true,
    });
  };

  console.log("formdata", formData);

  const allFeedBacks = () => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/feedback/get-all-feedbacks`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response of getAllFeedback: ", response?.data);
        setAllData(response?.data.feedbacks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log("allData: ", allData);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const displayedData = allData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <SimpleBanner image={TopBanner} name="Feedback" path="Home>> Feedback" />
      <div className="wifull mx-auto px-4 md:px-12 xl:px-20 py-12 mb-16 font-geologica">
        <div className="text-center mb-12 lg:w-[50%] md:w-[60%] w-[80%] mx-auto">
          <span className="bg-red-100 text-red-500 px-4 py-2 rounded-full text-sm font-medium">
            TESTIMONIALS
          </span>
          <h2 className="lg:text-5xl sm:text-4xl text-2xl  font-bold mt-6 text-gray-900 capitalize">
            "What our customers are saying about us"
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-xl animate-pulse"
              >
                {/* Stars */}
                <div className="flex mb-4 space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-gray-300 rounded-md"
                    ></div>
                  ))}
                </div>

                {/* Comment */}
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6 mb-4"></div>

                {/* Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedData?.map((i) => {
              return (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-xl hover:scale-[1.02] transition duration-200">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) =>
                        star <= i?.ratings ? (
                          <AiFillStar
                            key={star}
                            className="w-5 h-5 text-yellow-400"
                          />
                        ) : (
                          <AiOutlineStar
                            key={star}
                            className="w-5 h-5 text-gray-300"
                          />
                        )
                      )}
                    </div>
                    <p className="text-gray-600 mb-6">{i.comment}</p>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">
                        {i.name}
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
        <div className="flex justify-center items-center">
          <Stack spacing={2} className="flex justify-center mt-6">
            <Pagination
              count={Math.ceil(allData.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
        <div className="max-w-3xl mx-auto px-4 pt-12 sm:mb-28 mb-36 font-geologica">
          <div className="text-center mb-10">
            <div className="inline-block bg-red-100 rounded-xl mb-4">
              <p className="text-sm px-6 py-1 text-red-600 font-semibold uppercase">
                Feedback form
              </p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 capitalize">
              Add Your Valuable Feedback
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border-gray-400 rounded-lg focus:ring-red-500 focus:border-black outline-none transition duration-200 border-[2px]"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Your email"
                  className="w-full px-4 py-3 border-[2px] border-gray-400 rounded-lg focus:ring-red-500 focus:border-black outline-none transition duration-200"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const phoneNumber = e.target.value;

                    if (/^\d{0,10}$/.test(phoneNumber)) {
                      setFormData({ ...formData, phone: phoneNumber });
                    }
                  }}
                  placeholder="Your Number"
                  className="w-full px-4 py-3 border-[2px] border-gray-400 rounded-lg focus:ring-red-500 focus:border-black outline-none transition duration-200"
                  maxLength={10}
                  required
                />
              </div>

              <div className="w-full">
                <select
                  value={formData.selectedRatings}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      selectedRatings: e.target.value,
                    })
                  }
                  className="w-full border-[2px] border-gray-400 rounded-lg px-2 h-[50px] text-secondaryTextColor"
                >
                  <option value="">Select a Rating</option>
                  {ratings.map((item) => (
                    <option key={item.rating} value={item.rating}>
                      {item.rating}
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <AiFillStar key={index} className="text-yellow-500" />
                      ))}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Type message"
                rows={6}
                className="w-full px-4 py-3 border-[2px] border-gray-400 rounded-lg focus:ring-red-500 focus:border-black outline-none transition duration-200"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={submitLoading}
                className={`
              bg-black text-white px-8 py-3 rounded-lg 
              hover:bg-gray-800 transition duration-200 
              font-medium
              ${submitLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
              >
                {submitLoading ? "Please wait ..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Feedback;
