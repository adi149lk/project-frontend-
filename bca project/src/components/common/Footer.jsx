import React from "react";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import Logo from "../../Assets/Logos/Logo.png";
import FooterBackground from "../../Assets/Images/FooterBackground.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative">
      {/* Newsletter Banner - overlap */}
      <div className="absolute sm:-top-20  -top-32 left-0 right-0">
        <div className="bg-red-500 p-7 max-w-7xl mx-auto rounded-lg ">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
            <h2 className="xl:text-4xl lg:text-3xl sm:text-2xl text-xl font-bold sm:px-8 text-white capitalize ">
              Subscribe for latest update about{" "}
              <span className="text-black">SPEEDTOYZ</span>
            </h2>
            <div className="flex gap-2 w-full md:w-auto flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 sm:py-2 py-1 rounded text-black flex-grow md:w-64"
              />
              <button className="bg-black text-white px-6 py-1.5 rounded w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="bg-black text-white pt-24"
        style={{
          backgroundImage: `url(${FooterBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img src={Logo} alt="Speed Toyz" className="h-20" />
              <p className="text-red-100 font-geologica font-medium">
                Your Journey, Our Wheels. . .
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/"
                    className="hover:text-white"
                    onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white"
                    onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/car"
                    className="hover:text-white"
                    onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Cars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feedback"
                    className="hover:text-white"
                    onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white"
                    onClick={window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Term & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Cancelation Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Reach Us</h3>
              <p className=" text-gray-400">
                Kalinga Bihar, Patrapada,
                <br />
                Bhubaneswar, Odisha, 769015
              </p>
              <p className="text-sm mb-1">speedtoyz2@gmail.com</p>
              <p className="text-sm mb-1">+91 9348994082</p>
              <p className="text-sm mb-1">+91 9938848434</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              Copyright © 2025{" "}
              <span className="text-red-500">Speed Toyz 2.0</span>, Inc. All
              Rights Reserved
            </p>
            <div className="flex gap-4 items-center">
              <span className="text-sm text-gray-400">Follow Us On:</span>
              <a href="#" className="hover:text-red-500">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-red-500">
                <FaYoutube size={20} />
              </a>
              <a
                href="https://www.instagram.com/speedtoyz2.o/?igsh=OTQ4NXRjcWE0bHNr"
                className="hover:text-red-500"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
