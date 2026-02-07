import { React, useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiLeftArrowCircle } from "react-icons/bi";
import { LuMessageSquarePlus } from "react-icons/lu";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import uploadImg from "../Reusable Functions/uploadImgToCloudinary";
import axios from "axios";
import ButtonLoader from "../../common/ButtonLoader";

function EditCar() {
  const navigate = useNavigate();
  const { id } = useParams(); //Fetching carId from the URL parameters

  const [extraFeature, setExtraFeature] = useState("");
  const [error, setError] = useState(false);
  const [noHour, setNoHour] = useState(false); //if hour field is left empty
  const [noFare, setNoFare] = useState(false); //if fare field is left empty

  const [carData, setCarData] = useState({});
  const [imagesUrls, setImagesUrls] = useState([]);
  const [extraFeatureArray, setExtraFeatureArray] = useState([]);
  const [farePerHourData, setFarePerHourData] = useState([
    { hour: "", fare: "" },
  ]);
  const [loading, setLoading] = useState(false);

  //React Hook Form initialization
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  //Function to get the car details by ID
  const getCarById = (carId) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/car/get-car-by-id/${carId}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response of getCarById: ", response.data);
        setCarData(response.data.car);
        setImagesUrls(response.data.car.imagesUrls);
        setExtraFeatureArray(response.data.car.extraFeatures);
        setFarePerHourData(response.data.car.farePerHour);
        reset({
          ...response.data.car,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCarById(id);
  }, [reset]);

  console.log("CarData: ", carData);

  //Function to add multiple extra features
  const handleAddExtraFeatures = () => {
    const arr = [...extraFeatureArray];
    arr.push(extraFeature);
    setExtraFeatureArray(arr);
    setExtraFeature("");
  };

  //Function to remove an extra feature
  const removeExtraFeature = (itemIndex) => {
    const newArr = extraFeatureArray.filter((_, index) => {
      return index !== itemIndex;
    });
    setExtraFeatureArray(newArr);
  };

  //Function to handle image upload
  const handleImageUpload = async (files) => {
    const fileArray = Array.from(files);
    const uploadedUrls = await Promise.all(
      fileArray.map((img) => uploadImg(img))
    );
    setImagesUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
  };

  //Function to remove an image
  const removeImage = (imageIndex) => {
    const newArr = imagesUrls.filter((_, index) => {
      return index !== imageIndex;
    });
    setImagesUrls(newArr);
  };

  //Function to handle input change
  const handleInputChange = (index, field, value) => {
    const updatedData = [...farePerHourData];
    updatedData[index][field] = value;
    setFarePerHourData(updatedData);
  };

  //Function to add more farePerHour fields
  const addFields = () => {
    setFarePerHourData([...farePerHourData, { hour: "", fare: "" }]);
  };

  //Function to remove farePerHour fields
  const removeFields = (index) => {
    const updatedData = farePerHourData.filter((_, i) => i !== index);
    setFarePerHourData(updatedData);
  };

  //Function to handle click add more fareperHour field
  const handleAddMoreFieldsClick = () => {
    addFields();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const finalData = {
      ...data,
      imagesUrls: imagesUrls,
      farePerHour: farePerHourData,
      extraFeatures: extraFeatureArray,
    };

    console.log("finalData: ", finalData);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/car/update-car/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: finalData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Response of onSubmit: ", response.data);
        setLoading(false);
        navigate("/cars");

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Car edited successfully",
          showConfirmButton: true,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log("farePerHourData: ", farePerHourData);

  return (
    <div className="m-4 md:m-6 bg-white">
      <div className="flex items-center">
        <button onClick={() => navigate("/cars")}>
          <BiLeftArrowCircle size={28} className="text-primaryColor" />
        </button>
        <h1 className="tracking-wide px-2 py-1 rounded-lg text-3xl font-bold text-primaryColor">
          Edit Car
        </h1>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6"
        >
          {/* Registration Number */}
          <div>
            <label
              htmlFor="registrationNumber"
              className="text-sm font-medium text-primaryTextColor"
            >
              Registration No.
            </label>

            <input
              type="text"
              id="registrationNumber"
              placeholder="Enter Vehcle Registration No. "
              {...register("registrationNumber", {
                required: "Registration Number is required",
              })}
              className={`mt-1 p-2 border ${
                errors.registrationNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg w-full`}
            />

            {errors.registrationNumber && (
              <span className="text-red-500 text-sm">
                {errors.registrationNumber.message}
              </span>
            )}
          </div>

          {/* Type */}
          {/* <div>
            <label
              htmlFor="type"
              className="text-sm font-medium text-primaryTextColor"
            >
              Type
            </label>

            <input
              type="text"
              id="type"
              placeholder="Enter Type of Vehicle "
              {...register("type", {
                required: "Type of vehicle is required",
              })}
              className={`mt-1 p-2 border ${
                errors.type ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.type && (
              <span className="text-red-500 text-sm">
                {errors.type.message}
              </span>
            )}
          </div> */}

          {/* Manufacturing Company */}
          <div>
            <label
              htmlFor=""
              className="text-sm font-medium text-primaryTextColor"
            >
              Manufacturing Company
            </label>

            <input
              type="text"
              id="manufacturer"
              placeholder="Enter Manufacturing Company"
              {...register("manufacturer", {
                required: " is required",
              })}
              className={`mt-1 p-2 border ${
                errors.manufacturer ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.manufacturer && (
              <span className="text-red-500 text-sm">
                {errors.manufacturer.message}
              </span>
            )}
          </div>

          {/* Model */}
          <div>
            <label
              htmlFor="model"
              className="text-sm font-medium text-primaryTextColor"
            >
              Model
            </label>

            <input
              type="text"
              id="model"
              placeholder="Enter model "
              {...register("model", {
                required: "Model is required",
              })}
              className={`mt-1 p-2 border ${
                errors.model ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.model && (
              <span className="text-red-500 text-sm">
                {errors.model.message}
              </span>
            )}
          </div>

          {/* Year */}
          <div>
            <label
              htmlFor="year"
              className="text-sm font-medium text-primaryTextColor"
            >
              Year
            </label>

            <input
              type="number"
              id="year"
              placeholder="Enter Year "
              {...register("year", {
                required: "Year is required",
              })}
              className={`mt-1 p-2 border ${
                errors.year ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.year && (
              <span className="text-red-500 text-sm">
                {errors.year.message}
              </span>
            )}
          </div>

          {/* Color */}
          <div>
            <label
              htmlFor="color"
              className="text-sm font-medium text-primaryTextColor"
            >
              Color
            </label>

            <input
              type="text"
              id="color"
              placeholder="Enter color "
              {...register("color", {
                required: "Color is required",
              })}
              className={`mt-1 p-2 border ${
                errors.color ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.color && (
              <span className="text-red-500 text-sm">
                {errors.color.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="text-sm font-medium text-primaryTextColor"
            >
              Category
            </label>

            <select
              name="category"
              id="category"
              {...register("category", { required: "Category is required" })}
              className={`mt-1 block w-full border ${
                errors.category ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            >
              <option value="">Select Category</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
              <option value="Mini">Mini</option>
            </select>

            {errors.category && (
              <span className="text-red-500 text-sm">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Fuel Type */}
          <div>
            <label
              htmlFor="fuelType"
              className="text-sm font-medium text-primaryTextColor"
            >
              Fuel Type
            </label>

            <select
              name="fuelType"
              id="fuelType"
              {...register("fuelType", { required: "Fuel Type is required" })}
              className={`mt-1 block w-full border ${
                errors.fuelType ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            {errors.fuelType && (
              <span className="text-red-500 text-sm">
                {errors.fuelType.message}
              </span>
            )}
          </div>

          {/* Transmission */}
          <div>
            <label
              htmlFor="transmission"
              className="text-sm font-medium text-primaryTextColor"
            >
              Transmission
            </label>

            <select
              name="transmission"
              id="transmission"
              {...register("transmission", {
                required: "Transmission is required",
              })}
              className={`mt-1 block w-full border ${
                errors.transmission ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>

            {errors.transmission && (
              <span className="text-red-500 text-sm">
                {errors.transmission.message}
              </span>
            )}
          </div>

          {/* Fuel Policy */}
          <div>
            <label
              htmlFor="fuelPolicy"
              className="text-sm font-medium text-primaryTextColor"
            >
              Fuel Policy
            </label>

            <select
              name="fuelPolicy"
              id="fuelPolicy"
              {...register("fuelPolicy", {
                required: "Fuel Policy is required",
              })}
              className={`mt-1 block w-full border ${
                errors.fuelPolicy ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            >
              <option value="">Select Fuel Policy</option>
              <option value="Full to Full">Full to Full</option>
              <option value="Same Level">Same Level</option>
            </select>

            {errors.fuelPolicy && (
              <span className="text-red-500 text-sm">
                {errors.fuelPolicy.message}
              </span>
            )}
          </div>

          {/* Images */}
          <div>
            <label
              htmlFor="imagesUrls"
              className="text-sm font-medium text-primaryTextColor"
            >
              Images
            </label>

            <input
              type="file"
              id="imagesUrls"
              accept="Image/*"
              multiple
              onChange={(e) => handleImageUpload(e.target.files)}
              className={`mt-1 p-2 border  rounded w-full`}
            />

            <div className="mt-2 flex flex-wrap gap-2">
              {imagesUrls.map((img, index) => (
                <div className="relative">
                  <img
                    key={index}
                    src={img}
                    alt="Car image"
                    className="w-20 rounded-md relative"
                  />
                  <IoCloseSharp
                    size={16}
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 font-extrabold cursor-pointer text-red-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Capacity */}
          <div>
            <label
              htmlFor="capacity"
              className="text-sm font-medium text-primaryTextColor"
            >
              Capacity
            </label>

            <input
              type="number"
              id="capacity"
              min={1}
              placeholder="Enter capacity "
              {...register("capacity", {
                required: "Capacity is required",
              })}
              className={`mt-1 p-2 border ${
                errors.capacity ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.capacity && (
              <span className="text-red-500 text-sm">
                {errors.capacity.message}
              </span>
            )}
          </div>

          {/* Kilometer per day */}
          <div>
            <label
              htmlFor="kmPerDay"
              className="text-sm font-medium text-primaryTextColor"
            >
              Kilometer per day
            </label>

            <input
              type="number"
              id="kmPerDay"
              min={1}
              placeholder="Enter Kilometer per day "
              {...register("kmPerDay", {
                required: "Kilometer per day is required",
              })}
              className={`mt-1 p-2 border ${
                errors.kmPerDay ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.kmPerDay && (
              <span className="text-red-500 text-sm">
                {errors.kmPerDay.message}
              </span>
            )}
          </div>

          {/* Fare Per Km */}
          <div>
            <label
              htmlFor="farePerKm"
              className="text-sm font-medium text-primaryTextColor"
            >
              Fare per Kilometer
            </label>

            <input
              type="number"
              id="farePerKm"
              min={1}
              placeholder="Enter Fare per Kilometer"
              {...register("farePerKm", {
                required: "farePerKm is required",
              })}
              className={`mt-1 p-2 border ${
                errors.farePerKm ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.farePerKm && (
              <span className="text-red-500 text-sm">
                {errors.farePerKm.message}
              </span>
            )}
          </div>

          {/* Fare Per Hour */}
          <div className="col-span-1 md:col-span-2 w-full">
            <label
              htmlFor="farePerHour"
              className="text-sm font-medium text-primaryTextColor"
            >
              Fare per Hour
            </label>
            <div className="hidden  md:grid grid-cols-2 gap-6">
              <p className="text-sm font-medium text-primaryTextColor">Hours</p>
              <p className="text-sm font-medium text-primaryTextColor">Fare</p>
            </div>
            {farePerHourData.map((item, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-2"
              >
                {/* Hour */}
                <div>
                  <input
                    type="number"
                    id="hour"
                    value={item.hour}
                    min={1}
                    onChange={(e) => {
                      handleInputChange(index, "hour", e.target.value);
                    }}
                    placeholder="Enter Hour"
                    className={`mt-1 p-2 border ${
                      noHour ? "border-red-500" : "border-gray-300"
                    } rounded w-full`}
                  />
                  {noHour && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>

                {/* Fare */}
                <div>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      id="fare"
                      value={item.fare}
                      min={1}
                      onChange={(e) => {
                        setNoFare(false);
                        handleInputChange(index, "fare", e.target.value);
                      }}
                      placeholder="Enter Fare"
                      className={`mt-1 p-2 border ${
                        noFare ? "border-red-500" : "border-gray-300"
                      } rounded w-full`}
                    />
                    {/* Remove Button */}
                    {farePerHourData.length > 1 && (
                      <button
                        onClick={() => removeFields(index)}
                        className=" text-white px-3 rounded"
                      >
                        ❌
                      </button>
                    )}
                  </div>
                  {noFare && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMoreFieldsClick}
              className="float-right bg-blue-500 text-white px-4 py-1 rounded mt-2"
            >
              <span className="text-lg">+</span> Add More
            </button>
          </div>

          {/* Extra Charges per Km */}
          <div>
            <label
              htmlFor="extraChargePerKm"
              className="text-sm font-medium text-primaryTextColor"
            >
              Extra charges per Kilometer
            </label>

            <input
              type="number"
              id="extraChargePerKm"
              min={0}
              placeholder="Enter Extra charges per Kilometer"
              {...register("extraChargePerKm")}
              className={`mt-1 p-2 border ${
                errors.extraChargePerKm ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.extraChargePerKm && (
              <span className="text-red-500 text-sm">
                {errors.extraChargePerKm.message}
              </span>
            )}
          </div>

          {/* Extra Charges per hour */}
          <div>
            <label
              htmlFor="extraChargePerHour"
              className="text-sm font-medium text-primaryTextColor"
            >
              Extra charges per Hour
            </label>

            <input
              type="number"
              id="extraChargePerHour"
              min={0}
              placeholder="Enter Extra charges per Hour"
              {...register("extraChargePerHour")}
              className={`mt-1 p-2 border ${
                errors.extraChargePerHour ? "border-red-500" : "border-gray-300"
              } rounded w-full`}
            />

            {errors.extraChargePerHour && (
              <span className="text-red-500 text-sm">
                {errors.extraChargePerHour.message}
              </span>
            )}
          </div>

          {/* Extra Features */}
          <div>
            <label
              htmlFor="farePerKm"
              className="text-sm font-medium text-primaryTextColor"
            >
              Extra Features
            </label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Enter extra features"
                value={extraFeature}
                onChange={(e) => {
                  setError(false);
                  setExtraFeature(e.target.value);
                }}
                className={`mt-1 p-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded w-full`}
              />
              <LuMessageSquarePlus
                size={30}
                onClick={() =>
                  extraFeature ? handleAddExtraFeatures() : setError(true)
                }
                className="text-green-500"
              />
            </div>
            {error && (
              <span className="text-red-500 text-sm">Enter a feature</span>
            )}
            <div className="mt-2 rounded-lg bg-gray-50 px-2 py-2">
              <ul className="flex flex-wrap items-center gap-1">
                {extraFeatureArray.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-gray-300 px-2 py-1 text-sm text-black"
                  >
                    {feature.substring(0, 30)}
                    <IoCloseSharp
                      size={18}
                      className="font-semibold cursor-pointer text-red-500"
                      onClick={() => removeExtraFeature(index)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-primaryTextColor"
            >
              Description
            </label>

            <textarea
              id="description"
              resize="none"
              placeholder="Enter description "
              {...register("description")}
              className={`mt-1 resize-none p-2 border rounded w-full`}
            />
          </div>

          <button
            type="submit"
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
              // onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditCar;
