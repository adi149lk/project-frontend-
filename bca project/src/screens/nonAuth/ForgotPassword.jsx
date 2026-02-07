import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import logo from "../../Assets/Logos/yostel.svg";
import { BiSolidLogInCircle } from "react-icons/bi";
import axios from 'axios';
import ButtonLoader from "../../components/common/ButtonLoader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Regular expression to validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Proceed with form submission or API call
      console.log("Form submitted successfully");

      let data = JSON.stringify({
        "email": email,
        "newPassword": password
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/users/user-forgot-password`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      setIsLoading(true);
      axios.request(config)
        .then((response) => {
          // console.log('response', response.data);
          setIsLoading(false);
          navigate("/login")
        })
        .catch((error) => {
          console.log('error', error);
          setIsLoading(false);
          setApiError(error?.response?.data?.message);
          setTimeout(() => {
            setApiError('');
          }, 3000);
        });

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-400 to-slate-100 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primaryFadedColor to-primaryColor shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg rounded-lg sm:rounded-3xl p-12">
          <div className="max-w-md mx-auto">
            {/* Logo Section */}
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Logo" className="h-16 sm:h-20 lg:h-28 w-auto" />
            </div>

            <h1 className="text-lg font-semibold tracking-wider text-center mb-4 sm:text-2xl lg:text-3xl">
              Forgot Your Password
            </h1>

            <div className="text-xs sm:text-sm md:text-lg text-secondaryTextColor font-medium tracking-wider text-center mb-2">
              Fill the form to Forgot Password
            </div>

            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-4 text-base leading-6 text-primaryTextColor sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`peer placeholder-transparent tracking-wide h-10 w-full border-b-2 ${errors.email ? "border-red-500" : "border-secondaryTextColor"
                      } text-primaryTextColor focus:outline-none focus:border-primaryColor`}
                    placeholder="Email address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute tracking-wide left-0 -top-3.5 text-primaryTextColor text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-primaryTextColor peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                  {errors.email && <p className="text-red-500 text-xs mt-1 tracking-wide">{errors.email}</p>}
                </div>

                <div className="relative mt-5">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`peer placeholder-transparent tracking-wide h-10 w-full border-b-2 ${errors.password ? "border-red-500" : "border-secondaryTextColor"
                      } text-primaryTextColor focus:outline-none focus:border-primaryColor`}
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute tracking-wide left-0 -top-3.5 text-primaryTextColor text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-primaryTextColor peer-focus:text-sm"
                  >
                    Password
                  </label>
                  {errors.password && <p className="text-red-500 text-xs mt-1 tracking-wide">{errors.password}</p>}
                </div>

                {
                  apiError ?
                    <div className='text-xs my-3 font-semibold text-red-500 tracking-wide text-start'>
                      {apiError}
                    </div>
                    :
                    <div className='text-xs my-3 font-semibold'>
                      &nbsp;
                    </div>
                }

                <div className="">
                  {
                    isLoading
                      ?
                      <button className="w-full h-12 flex justify-center items-center bg-primaryBtnColor text-white rounded-md tracking-wide transition duration-200 hover:bg-primaryBtnHoverColor">
                        <ButtonLoader />
                      </button>
                      :
                      <button
                        type="submit"
                        className="w-full h-12 flex justify-center items-center bg-primaryBtnColor text-white rounded-md tracking-wide transition duration-200 hover:bg-primaryBtnHoverColor"
                      >
                        Forgot
                      </button>
                  }

                  <div className="flex justify-center space-x-6 text-primaryTextColor mt-6">
                    <button
                      onClick={() => navigate("/")}
                      className="flex items-center space-x-1 text-sm sm:text-base text-secondaryTextColor hover:text-primaryColor transition duration-200"
                    >
                      <HiMiniHome size={20} />
                      <span>Home</span>
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="flex items-center space-x-1 text-sm sm:text-base text-secondaryTextColor hover:text-primaryColor transition duration-200"
                    >
                      <BiSolidLogInCircle size={20} />
                      <span>Login</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
