import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import confirmDelete from "../../components/AdminSideComponents/Reusable Functions/ConfirmDelete";
import EditFeedbackModal from "../../components/AdminSideComponents/Feedback/EditFeedbackModal";

function Feedbacks() {
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  //Function to get all feedbacks
  const getAllFeedback = () => {
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
        console.log("Response of getAllFeedback: ", response.data);
        setFeedbacks(response.data.feedbacks);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllFeedback();
  }, []);

  //Function to handle edit click
  const handleEditClick = (feedback) => {
    setSelectedFeedback(feedback);
    setEditModalOpen(true);
  };

  //Function to delete a feedback
  const deleteFeedback = (id) => {
    setLoading(true);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/feedback/delete-feedback/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response of deleteFeedback:", response.data);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Feedback deleted successfully",
          showConfirmButton: true,
          timer: 1500,
        });
        setLoading(false);
        getAllFeedback();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  //Pagination Functionality
  const feedbacksPerPage = 9;
  const totalPages = Math.ceil(feedbacks?.length / feedbacksPerPage);

  //Getting data of current page
  const currentFeedbacks = feedbacks.slice(
    (currentPage - 1) * feedbacksPerPage,
    currentPage * feedbacksPerPage
  );

  //Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="m-4 md:m-6 bg-gray-50">
      {/* Edit Modal */}
      {editModalOpen && (
        <EditFeedbackModal
          feedback={selectedFeedback}
          getAllFeedback={getAllFeedback}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      <h1 className="tracking-wide py-1 rounded-lg text-3xl font-bold text-primaryColor">
        Feedbacks
      </h1>

      {/* All Feedbacks goes here */}
      {loading ? (
        //Skeleton Loader
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-xl animate-pulse"
              >
                <div className="flex justify-between">
                  {/* Star Ratings Placeholder */}
                  <div className="flex mb-4 space-x-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 bg-skeletonLoaderColor rounded"
                        ></div>
                      ))}
                  </div>

                  {/* Edit & Delete Icons Placeholder */}
                  <div className="flex gap-2">
                    <div className="w-5 h-5 bg-skeletonLoaderColor rounded"></div>
                    <div className="w-5 h-5 bg-skeletonLoaderColor rounded"></div>
                  </div>
                </div>

                {/* Comment Placeholder */}
                <div className="h-4 bg-skeletonLoaderColor rounded w-full mb-4"></div>
                <div className="h-4 bg-skeletonLoaderColor rounded w-3/4 mb-4"></div>

                {/* Name Placeholder */}
                <div className="h-4 bg-skeletonLoaderColor rounded w-1/3 mb-2"></div>

                {/* Email & Phone Placeholder */}
                <div className="flex flex-col gap-1 text-xs">
                  <div className="h-3 bg-skeletonLoaderColor rounded w-2/3"></div>
                  <div className="h-3 bg-skeletonLoaderColor rounded w-1/2"></div>
                </div>
              </div>
            ))}
        </div>
      ) : feedbacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {currentFeedbacks?.map((i) => {
            return (
              <>
                <div className="bg-white p-6 rounded-lg shadow-xl hover:scale-[1.02] transition duration-200">
                  <div className="flex justify-between">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) =>
                        star <= i?.ratings ? (
                          <AiFillStar
                            key={star}
                            className="w-5 h-5 text-primaryColor"
                          />
                        ) : (
                          <AiOutlineStar
                            key={star}
                            className="w-5 h-5 text-gray-300"
                          />
                        )
                      )}
                    </div>

                    <div className="flex gap-2">
                      <FaEdit
                        size={18}
                        onClick={() => handleEditClick(i)}
                        className="cursor-pointer text-green-500 transition-transform hover:scale-105 duration-100 ease-in-out hover:text-green-600"
                      />
                      <MdDeleteOutline
                        size={18}
                        onClick={() => confirmDelete(i._id, deleteFeedback)}
                        className="cursor-pointer text-red-500 transition-transform hover:scale-105 duration-100 ease-in-out hover:text-red-600"
                      />
                    </div>
                  </div>
                  <p className="text-secondaryTextColor mb-4">{i.comment}</p>

                  <div className="flex items-center gap-3 justify-between">
                    <span className="font-semibold text-primaryTextColor">
                      {i.name}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 text-blue-400 text-xs">
                    <div className="">{i.email}</div>
                    <div className="">{i.phone}</div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <div className="col-span-3 py-60 px-6 text-lg text-center text-secondaryTextColor">
          No Feedbacks Available
        </div>
      )}
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
  );
}

export default Feedbacks;
