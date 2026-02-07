import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ButtonLoader from "../../common/ButtonLoader";

function UpdateStatusModal({ booking, onClose, getAllBookings }) {
  const [bookingStatus, setBookingStatus] = useState(booking.bookingStatus);
  const [loading, setLoading] = useState(false);
  const handleStatusChange = (status) => {
    setBookingStatus(status);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...booking,
      bookingStatus: bookingStatus,
    };

    console.log("Data: ", data);

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/booking/update-booking/${booking._id}`,
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
          title: "Booking Status updated successfully",
          showConfirmButton: true,
          timer: 1500,
        });
        setLoading(false);
        onClose();
        getAllBookings();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[80%] md:h-auto overflow-y-scroll md:overflow-y-hidden bg-white p-8 lg:py-8 lg:px-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="">
          {/* Modal Header */}
          <h2 className="text-2xl font-semibold text-center text-primaryTextColor">
            Update Booking Status
          </h2>

          <form action="" className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex items-center gap-4 my-4 justify-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  value="finished"
                  checked={bookingStatus === "finished"}
                  onChange={(e) => handleStatusChange(e.target.value)}
                />
                <label htmlFor="">Finished</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  value="canceled"
                  checked={bookingStatus === "canceled"}
                  onChange={(e) => handleStatusChange(e.target.value)}
                />
                <label htmlFor="">Canceled</label>
              </div>
            </div>

            <button
              className="bg-gray-200 hover:bg-gray-300 text-black p-2 rounded text-lg"
              type="button"
              onClick={() => onClose()}
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
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateStatusModal;
