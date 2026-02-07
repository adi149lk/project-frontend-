import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [saveInfo, setSaveInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 sm:mb-28 mb-36 font-geologica">
      <div className="text-center mb-10">
        <div className="inline-block bg-red-100 rounded-xl mb-4">
          <p className="text-sm px-6 py-1 text-red-600 font-semibold uppercase">
            Get in touch
          </p>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Send A Message</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3  border-gray-400 rounded-lg  focus:ring-red-500 focus:border-black outline-none transition duration-200 border-[2px]"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-[2px] border-gray-400 rounded-lg  focus:ring-red-500 focus:border-black outline-none transition duration-200"
              required
            />
          </div>
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Type message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 border-[2px] border-gray-400 rounded-lg  focus:ring-red-500 focus:border-black outline-none transition duration-200"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveInfo"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-200 font-medium"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
