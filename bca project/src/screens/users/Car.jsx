import React from "react";
import { AllCars } from "../../components/usersComponents/Cars_Component/AllCars";
import SimpleBanner from "../../components/common/SimpleBanner";
import TopBanner from "../../Assets/Images/TopBanner.png";

const Car = () => {
  return (
    <div>
      <SimpleBanner image={TopBanner} name="Cars" path="Home>> Cars" />
      <AllCars />
    </div>
  );
};

export default Car;
