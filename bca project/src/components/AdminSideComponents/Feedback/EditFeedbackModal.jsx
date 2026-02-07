import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonLoader from "../../common/ButtonLoader";

function EditFeedbackModal({ feedback, onClose, getAllFeedback }) {
  const [loading, setLoading] = useState(false);

  //React hook form initialization
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  //Setting the existing data to the input fields
  useEffect(() => {
    reset({
      ...feedback,
    });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/feedback/update-feedback/${feedback._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response of onSubmit", response.data);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Feedback edited successfully",
          showConfirmButton: true,
          timer: 1500,
        });
        onClose();
        getAllFeedback();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[80%] md:h-auto overflow-y-scroll md:overflow-y-hidden bg-white p-8 lg:py-8 lg:px-16 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-center text-primaryTextColor">
            Edit Feedback
          </h2>

          {/* Modal Body */}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {/* Rating */}
            <div className="flex flex-col my-4">
              <label
                htmlFor="rating"
                className="text-sm font-medium text-primaryTextColor"
              >
                Rating
              </label>

              <select
                name="rating"
                id="rating"
                className={`mt-1 p-2 border ${
                  errors.ratings ? "border-red-500" : "border-gray-300"
                } rounded-lg w-full`}
                {...register("ratings", { required: "Rating is required" })}
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option value={r}>{r}</option>
                ))}
              </select>
              {errors.ratings && (
                <span className="text-red-500 text-sm">
                  {errors.ratings.message}
                </span>
              )}
            </div>

            {/* Feedback */}
            <div className="flex flex-col my-4">
              <label
                htmlFor="feedback"
                className="text-sm font-medium text-primaryTextColor"
              >
                Feedback
              </label>
              <textarea
                name="feedback"
                id="feedback"
                placeholder="Enter Feedback here"
                className={`resize-none mt-1 p-2 border ${
                  errors.comment ? "border-red-500" : "border-gray-300"
                } rounded-lg w-full`}
                {...register("comment", { required: "Feedback is required" })}
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              <button
                type="button"
                onClick={() => onClose()}
                className="bg-gray-200 hover:bg-gray-300 text-black p-2 rounded text-lg"
              >
                Cancel
              </button>

              {loading ? (
                <button className="w-full h-12 flex justify-center items-center bg-primaryBtnColor text-white rounded-md tracking-wide transition duration-200 hover:bg-primaryBtnHoverColor">
                  <ButtonLoader />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-primaryColor text-white hover:bg-primaryBtnHoverColor text-lg p-2 rounded "
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditFeedbackModal;
