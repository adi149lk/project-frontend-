import React from "react";
import ContactDetails from "../../components/usersComponents/Contact_usComponents/Contact_details";
import Location from "../../components/usersComponents/Contact_usComponents/Location";
import ContactForm from "../../components/usersComponents/Contact_usComponents/ContactForm";
import SimpleBanner from "../../components/common/SimpleBanner";
import TopBanner from "../../Assets/Images/TopBanner.png";

const Contact = () => {
  return (
    <div>
      <SimpleBanner
        image={TopBanner}
        name="Contact Us"
        path="Home>> Contact Us"
      />
      <ContactDetails />
      <Location />
      {/* <ContactForm /> */}
    </div>
  );
};

export default Contact;
