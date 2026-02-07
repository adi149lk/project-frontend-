import React from "react";

const Location = () => {
  return (
    <div className="w-[100vw] h-[80vh] xl:px-20 md:px-12 px-6 rounded-lg mb-32">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14974.107621283485!2d85.75205702817277!3d20.23697113280566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a87e93fc7d85%3A0x9e02dd536a84416d!2sKalinga%20Vihar%2C%20Patrapada%2C%20Bhubaneswar%2C%20Odisha%20751019!5e0!3m2!1sen!2sin!4v1738582485415!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Location;
