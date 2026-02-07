import React from "react";
import HeroSection from "../../components/usersComponents/HomeComponents/HeroSection";
import CarTypes from "../../components/usersComponents/HomeComponents/CarTypes";

import { PopularCars } from "../../components/usersComponents/HomeComponents/PopularCars";
import Numbers from "../../components/usersComponents/HomeComponents/Numbers";
import Testimonials, {
  FeedbackCard,
} from "../../components/usersComponents/HomeComponents/Testimonials";
import RentYourCarBanner from "../../components/common/RentYourCarBanner";
import TrustedPartner from "../../components/usersComponents/HomeComponents/TrustedPartner";
import Feedback from "../../components/usersComponents/HomeComponents/Feedback";

const Home = () => (
  <div className="pb-20 overflow-x-hidden">
    <HeroSection />
    <CarTypes />
    <PopularCars />
    <Numbers />
    <TrustedPartner />
    <RentYourCarBanner />
    <Feedback />
  </div>
);

export default Home;
