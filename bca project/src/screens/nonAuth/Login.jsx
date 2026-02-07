import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { IoIosKey } from "react-icons/io";
import logo from "../../Assets/Logos/Logo.png";
import axios from "axios";
import ButtonLoader from "../../components/common/ButtonLoader";

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phoneNumber: "", password: "" });
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { phoneNumber: "", password: "" };

    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
      valid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number is invalid.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    console.log("API URL: ", process.env.REACT_APP_API_URL);
    console.log("I am running");
    if (validateForm()) {
      let data = JSON.stringify({
        phone: phoneNumber,
        password: password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/admin-users/login-admin-user`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      setIsLoading(true);
      axios
        .request(config)
        .then((response) => {
          // console.log('login-response', response);

          localStorage.setItem("carRental-token", "jhbjhgjhgbmhvjhgvbkh");
          localStorage.setItem(
            "carRental-userData",
            JSON.stringify(response?.data?.user)
          );
          setIsLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log("login-error", error);
          setIsLoading(false);
          setApiError(error?.response?.data?.message);
          setTimeout(() => {
            setApiError("");
          }, 3000);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8cccf] to-[#f3e7e8] flex items-center justify-center px-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fd989f] to-primaryColor shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-[#242424] shadow-lg rounded-lg sm:rounded-3xl p-12">
          <div className="max-w-md mx-auto">
            {/* Logo Section */}
            <div className="flex justify-center mb-6">
              <img
                src={logo}
                alt="Logo"
                className="h-16 sm:h-20 lg:h-28 w-auto"
              />
            </div>

            <h1 className="text-lg text-white font-semibold tracking-wider text-center mb-2 sm:text-2xl lg:text-3xl">
              Login To The Dashboard
            </h1>

            <div className="text-xs sm:text-sm md:text-lg text-[#aeacac] font-medium tracking-wider text-center mb-2">
              Please enter your credentials to login
            </div>

            <div className="divide-y divide-gray-200">
              <div className="py-4 text-base leading-6 text-primaryTextColor sm:text-lg sm:leading-7">
                <div className="relative">
                  <label
                    htmlFor="phoneNumber"
                    className=" tracking-wide left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-primaryTextColor peer-focus:text-sm"
                  >
                    Phone Number
                  </label>
                  <input
                    autoComplete="off"
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`peer placeholder-transparent bg-inherit text-white tracking-wide h-10 w-full border-b-2 ${
                      errors.phoneNumber ? "border-red-500" : "border-[#aeacac]"
                    } text-primaryTextColor focus:outline-none focus:border-primaryColor`}
                    placeholder="Phone number"
                  />

                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1 tracking-wide">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="relative mt-5">
                  <label
                    htmlFor="password"
                    className="tracking-wide left-0 -top-3.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-primaryTextColor peer-focus:text-sm"
                  >
                    Password
                  </label>
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`peer placeholder-transparent text-white bg-inherit tracking-wide h-10 w-full border-b-2 autofill:bg-transparent ${
                      errors.password ? "border-red-500" : "border-[#aeacac]"
                    } text-white focus:outline-none focus:border-primaryColor`}
                    placeholder="Password"
                  />

                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 tracking-wide">
                      {errors.password}
                    </p>
                  )}
                </div>

                {apiError ? (
                  <div className="text-xs my-3 font-semibold text-red-500 tracking-wide text-start">
                    {apiError}
                  </div>
                ) : (
                  <div className="text-xs my-3 font-semibold">&nbsp;</div>
                )}

                <div className="">
                  {isLoading ? (
                    <button className="w-full h-12 flex justify-center items-center bg-primaryBtnColor text-white rounded-md tracking-wide transition duration-200 hover:bg-primaryBtnHoverColor">
                      <ButtonLoader />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="w-full h-12 flex justify-center items-center bg-primaryBtnColor text-white rounded-md tracking-wide transition duration-200 hover:bg-primaryBtnHoverColor"
                    >
                      Login
                    </button>
                  )}

                  <div className="flex justify-center space-x-6 text-primaryTextColor mt-6">
                    <button
                      onClick={() => navigate("/")}
                      className="flex items-center space-x-1 text-sm sm:text-base text-[#aeacac] hover:text-primaryColor transition duration-200"
                    >
                      <HiMiniHome size={20} />
                      <span>Home</span>
                    </button>
                    <button
                      onClick={() => navigate("/forgot-password")}
                      className="flex items-center space-x-1 text-sm sm:text-base text-[#aeacac] hover:text-primaryColor transition duration-200"
                    >
                      <IoIosKey size={20} />
                      <span>Forgot Password</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
