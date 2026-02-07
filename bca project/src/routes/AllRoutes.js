import Login from "../screens/nonAuth/Login";
import Register from "../screens/nonAuth/Register";
import Dashboard from "../screens/auth/Dashboard";
import Home from "../screens/users/Home";
import About from "../screens/users/About";
import Contact from "../screens/users/Contact";
import ForgotPassword from "../screens/nonAuth/ForgotPassword";
import Booking from "../screens/auth/Booking";
import Profile from "../screens/auth/Profile";
import Car from "../screens/users/Car";
import Feedback from "../screens/users/Feedback";
import Form from "../components/usersComponents/Cars_Component/Form";
import Cars from "../screens/auth/Cars";
import AddCar from "../components/AdminSideComponents/Cars/AddCar";
import EditCar from "../components/AdminSideComponents/Cars/EditCar";
import Feedbacks from "../screens/auth/Feedbacks";
import CreateBooking from "../components/AdminSideComponents/Booking/CreateBooking";
import EditBooking from "../components/AdminSideComponents/Booking/EditBooking";

export const authRoutes = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/bookings",
    component: <Booking />,
  },
  {
    path: "/createBooking",
    component: <CreateBooking />,
  },
  {
    path: "/editBooking/:id",
    component: <EditBooking />,
  },
  {
    path: "/cars",
    component: <Cars />,
  },
  {
    path: "/addCar",
    component: <AddCar />,
  },
  {
    path: "/editCar/:id",
    component: <EditCar />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/feedbacks",
    component: <Feedbacks />,
  },
];

export const nonAuthRoutes = [
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/forgot-password",
    component: <ForgotPassword />,
  },
];

export const userRoutes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/about",
    component: <About />,
  },
  {
    path: "/contact",
    component: <Contact />,
  },
  {
    path: "/car",
    component: <Car />,
  },
  {
    path: "/feedback",
    component: <Feedback />,
  },
  {
    path: "/booking/:carId",
    component: <Form />,
  },
];
