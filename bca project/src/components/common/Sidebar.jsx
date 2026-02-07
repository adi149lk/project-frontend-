import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu4Line, RiDashboardLine } from "react-icons/ri";
import { BsJournalBookmarkFill } from "react-icons/bs";

import { IoCar, IoClose, IoCarSportOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const path = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <RiDashboardLine size={18} />,
      path: "/dashboard",
      permission: "dashboard",
    },
    {
      label: "Bookings",
      icon: <BsJournalBookmarkFill size={18} />,
      path: "/bookings",
      permission: "bookings",
    },
    {
      label: "Cars",
      icon: <IoCarSportOutline size={18} />,
      path: "/cars",
      permission: "cars",
    },
    {
      label: "Feedback",
      icon: <MdOutlineFeedback size={18} />,
      path: "/feedbacks",
      permission: "feedback",
    },
  ];

  const renderMenuItems = () => (
    <ul className="space-y-1 tracking-wide">
      {menuItems.map((item) => (
        <li key={item.path}>
          <div
            onClick={() => navigate(item.path)}
            className={`${
              path.pathname === item.path
                ? "bg-primaryColor text-[#d7d2d2] font-medium"
                : "text-[#d7d2d2] font-normal hover:bg-secondaryTextColor"
            } flex items-center cursor-pointer px-2 py-1 text-base rounded-md mt-3`}
          >
            {item.icon}
            <span className="ml-3 tracking-wide">{item.label}</span>
          </div>
        </li>
      ))}
    </ul>
  );

  const renderContactInfo = () => (
    <div className="text-white text-sm mt-6 border-t border-gray-700 pt-4">
      <p className="font-semibold">Contact Us</p>
      <p>Phone: +1 234 567 890</p>
      <p>Address: 123 Car Rental St, City, Country</p>
    </div>
  );

  return (
    <React.Fragment>
      {/* Large sidebar */}
      <div className="lg:contents hidden flex-shrink-0" aria-label="Sidebar">
        <div className="overflow-y-auto pb-6 px-3 pt-6 bg-[#080707] shadow-2xl h-screen flex flex-col justify-between">
          <div>
            <div className="text-md md:text-2xl font-semibold tracking-wider text-white text-center">
              Car Rental
            </div>
            {renderMenuItems()}
          </div>
          {renderContactInfo()}
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="block lg:hidden">
        <button
          onClick={toggleSidebar}
          className="absolute ml-6 mt-[-50px] text-white"
        >
          {isSidebarOpen ? <IoClose size={30} /> : <RiMenu4Line size={30} />}
        </button>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="h-full w-[50%] absolute z-50 shadow-2xl"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="overflow-y-auto py-4 px-3 bg-[#FFFFFF] h-screen relative flex flex-col justify-between">
                {renderMenuItems()}
                {renderContactInfo()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { RiMenu4Line, RiDashboardLine } from "react-icons/ri";
// import { IoClose, IoGridOutline } from "react-icons/io5";

// const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
//   const navigate = useNavigate();
//   const path = useLocation();

//   // const userData = JSON.parse(localStorage.getItem("carRental-userData"));
//   // const permissions = userData?.permissions || {};

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Define menu items with corresponding permissions
//   const menuItems = [
//     {
//       label: "Dashboard",
//       icon: <RiDashboardLine size={18} />,
//       path: "/dashboard",
//       permission: "dashboard",
//     },
//     {
//       label: "Bookings",
//       icon: <IoGridOutline size={18} />,
//       path: "/bookings",
//       permission: "bookings",
//     },
//     {
//       label: "Cars",
//       icon: <IoGridOutline size={18} />,
//       path: "/cars",
//       permission: "cars",
//     },
//   ];

//   // Filter menu items based on permissions
//   // const filteredMenuItems = menuItems.filter((item) => permissions[item.permission]);

//   const renderMenuItems = () => (
//     <ul className="space-y-1 tracking-wide">
//       {menuItems.map((item) => (
//         <li key={item.path}>
//           <div
//             onClick={() => navigate(item.path)}
//             className={`${
//               path.pathname === item.path
//                 ? "bg-primaryColor text-[#d7d2d2] font-medium"
//                 : "text-[#d7d2d2] font-normal hover:bg-secondaryTextColor"
//             } flex items-center cursor-pointer px-2 py-1 text-base rounded-md mt-3`}
//           >
//             {item.icon}
//             <span className="ml-3 tracking-wide">{item.label}</span>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <React.Fragment>
//       {/* Large sidebar */}
//       <div className="lg:contents hidden flex-shrink-0" aria-label="Sidebar">
//         <div className="overflow-y-auto pb-2 px-3 pt-6 bg-[#080707] shadow-2xl h-screen">
//           <div className="text-md md:text-2xl font-semibold tracking-wider text-white text-center">
//             Car Rental
//           </div>
//           {renderMenuItems()}
//         </div>
//       </div>

//       {/* Mobile sidebar */}
//       <div className="block lg:hidden">
//         <button
//           onClick={toggleSidebar}
//           className="absolute ml-6 mt-[-50px] text-white"
//         >
//           {isSidebarOpen ? <IoClose size={30} /> : <RiMenu4Line size={30} />}
//         </button>
//         <AnimatePresence>
//           {isSidebarOpen && (
//             <motion.div
//               className="h-full w-[50%] absolute z-50 shadow-2xl"
//               initial={{ opacity: 0, x: "-100%" }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: "-100%" }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="overflow-y-auto py-4 px-3 bg-[#FFFFFF] h-screen relative">
//                 {renderMenuItems()}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Sidebar;
