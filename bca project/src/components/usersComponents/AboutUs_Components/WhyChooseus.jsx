import React from "react";
import img from "../../../Assets/Images/why-choose-img.jpg.png";
import svg from "../../../Assets/Images/SVG.png";
import svg1 from "../../../Assets/Images/SVG1.png";
import svg2 from "../../../Assets/Images/SVG2.png";
import svg3 from "../../../Assets/Images/SVG3.png";

const WhyChooseus = () => {
  const features = [
    {
      icon: svg,
      title: "Extensive Fleet Options",
      description:
        "Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa",
    },
    {
      icon: svg1,
      title: "Exceptional Customer Service",
      description:
        "Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa",
    },
    {
      icon: svg2,
      title: "Convenient Locations",
      description:
        "Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa",
    },
    {
      icon: svg3,
      title: "Reliability And Safety",
      description:
        "Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa",
    },
  ];

  return (
    <div className="w-full mx-auto xl:px-20 lg:px-12 sm:px-8 px-4 pb-36 font-geologica">
      <div className="text-center mb-6">
        <div className="bg-red-100 rounded-xl sm:w-[20%] mx-auto w-full my-6">
          <p className="text-xs sm:text-sm px-4 sm:px-6 py-1 text-red-600 font-semibold uppercase text-center">
            WHY CHOOSE US
          </p>
        </div>
        <h2 className="text-3xl font-bold mt-2 mb-8 capitalize">
          Unmatched quality and service
          <br />
          for your needs
        </h2>
      </div>

      <div className="flex flex-wrap justify-between items-center">
        <div className="w-full lg:w-5/12">
          <div className="grid gap-8 sm:pr-3 pr-0">
            {features.slice(0, 2).map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-[#f5c4a7] rounded-full">
                  <img src={feature.icon} alt="" className="w-8 h-8  p-1" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-2/12 relative my-8 lg:my-0">
          <div className="relative">
            <div className="rounded-full overflow-hidden">
              <img src={img} alt="Vehicle" className="w-full" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-10 pl-0">
          <div className="grid gap-8">
            {features.slice(2, 4).map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-[#f5c4a7] rounded-full">
                  <img src={feature.icon} alt="" className="w-8 h-8  p-1" />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseus;
