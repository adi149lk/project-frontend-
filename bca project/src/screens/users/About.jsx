import React from "react";
import SimpleBanner from "../../components/common/SimpleBanner";
import TopBanner from "../../Assets/Images/TopBanner.png";

import HowItWorks from "../../components/usersComponents/AboutUs_Components/HowItWorks";
import PlanYourTrip from "../../components/usersComponents/AboutUs_Components/PlanYourTrip";
import WhyChooseus from "../../components/usersComponents/AboutUs_Components/WhyChooseus";

const About = () => {
  return (
    <div>
      <SimpleBanner image={TopBanner} name="About Us" path="Home>> About Us" />
      <HowItWorks />
      <PlanYourTrip />
      <WhyChooseus />
    </div>
  );
};

export default About;
