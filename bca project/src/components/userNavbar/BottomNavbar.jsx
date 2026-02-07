import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../Assets/Logos/Logo.png";
import { FaRegClock } from "react-icons/fa";
import textImg from "../../Assets/common/a-key-text.png";

const BottomNavbar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setActiveMenuItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenuItem]);

  const toggleDropdownOptions = (menuItem) => {
    setActiveMenuItem(activeMenuItem === menuItem ? null : menuItem);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const handleItemClick = (path) => {
  //   navigate(path);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   setMenuOpen(false); // Close the menu after item click
  // };

  const handleItemClick = (path, title) => {
    setActiveMenuItem(title);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  const menuItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Cars",
      path: "/car",
    },
    {
      title: "Feedback",
      path: "/feedback",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
  ];

  console.log("Active menu Item: ", activeMenuItem);

  return (
    <div>
      <HeaderNav />
      {/* desktop view */}
      <div className="bg-[#0D0D0D] px-6 md:px-10 xl:px-20 py-3 xl:flex hidden items-center justify-between shadow-md">
        {/* Logo */}
        <div>
          <img src={Logo} alt="Logo" className="w-56 h-auto" />
        </div>
        {/* Menu items */}
        <div className="flex gap-10 xl:gap-16 items-center">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex font-normal tracking-wide items-center gap-1 cursor-pointer relative ${
                activeMenuItem === item.title
                  ? "text-[#FF3600]"
                  : "text-[#ada6a6]"
              } hover:text-[#ffffff] xl:text-lg`}
              onClick={() =>
                item.options
                  ? toggleDropdownOptions(item.title)
                  : handleItemClick(item.path, item.title)
              }
            >
              {item.title}
            </div>
          ))}
        </div>
        {/* button */}
        <div>
          <button
            onClick={() => {
              navigate("/login");
              window.scrollTo(0, 0);
            }}
            className="bg-[#FF3443] hover:bg-[#F10013] text-white px-8 py-3 rounded-md text-lg"
          >
            Admin Log in
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="bg-[#0D0D0D] px-10 py-3 xl:hidden flex items-center justify-between shadow-lg">
        {/* Logo */}
        <div>
          <img src={Logo} alt="logo" className=" w-32 h-auto" />
        </div>
        {/* Menu option */}
        <div onClick={toggleMenu}>
          <GiHamburgerMenu size={30} className="text-white" />
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 bg-transparent flex justify-end z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 100 }}
              transition={{ duration: 0.2 }}
              ref={menuRef}
              className="bg-white shadow-lg textprimaryTextColor p-5 w-[90%] md:w-[60%] flex flex-col justify-between"
            >
              <div>
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start gap-1 relative"
                    onClick={() =>
                      item.options
                        ? toggleDropdownOptions(item.title)
                        : handleItemClick(item.path, item.title)
                    }
                  >
                    <div className="flex items-center mb-3 cursor-pointer text-[20px]">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between gap-4 items-center">
                <button
                  className="bg-[#FF3443] hover:bg-[#F10013] text-white px-4 py-2 rounded-md"
                  onClick={() => navigate("/login")}
                >
                  Login To Dashboard
                </button>

                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BottomNavbar;

const HeaderNav = () => {
  return (
    <div className="bg-[#242424] text-white px-5 md:px-10 xl:px-20 py-4 hidden md:flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <FaRegClock size={20} />
        <p>Open Hours: Mon - Fri 8.00 am - 6.00 pm</p>
      </div>
      <img src={textImg} alt="A Key to Happiness" className="h-6" />
    </div>
  );
};
