// import emailjs from "@emailjs/browser";

// const sendMail = (formData) => {
//   const serviceId = process.env.REACT_APP_EMAIL_JS_SERVICE_ID;
//   const customerTemplateId =
//     process.env.REACT_APP_CUSTOMER_EMAIL_JS_TEMPLATE_ID;
//   const adminTemplateId = process.env.REACT_APP_ADMIN_EMAIL_JS_TEMPLATE_ID;
//   const publicKey = process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY;

//   const templateParams = {
//     name: formData.name,
//     to_email: formData.mail,
//     startDate: formData.startDate,
//     endDate: formData.endDate,
//     pickUp: formData.pickup,
//     destination: formData.destination,
//   };
//   console.log("serviceId: ", serviceId.toString());
//   console.log("templateId: ", templateId.toString());
//   console.log("publicKey: ", publicKey.toString());
//   emailjs
//     .send(
//       serviceId.toString(),
//       templateId.toString(),
//       templateParams,
//       publicKey.toString()
//     )
//     .then((response) => {
//       console.log("Email sent successfully:", response);
//       return true;
//     })
//     .catch((error) => {
//       console.error("Error sending email:", error);
//       alert("Failed to send message.");
//     });
// };

// export default sendMail;

import emailjs from "@emailjs/browser";

const sendMail = (formData) => {
  const serviceId = process.env.REACT_APP_EMAIL_JS_SERVICE_ID;
  const customerTemplateId =
    process.env.REACT_APP_EMAIL_JS_CUSTOMER_TEMPLATE_ID;
  const adminTemplateId = process.env.REACT_APP_EMAIL_JS_ADMIN_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY;

  const templateParams = {
    name: formData.name,
    to_email: formData.mail,
    startDate: formData.startDate,
    endDate: formData.endDate,
    pickUp: formData.pickup,
    destination: formData.destination,
  };

  console.log("Form Data: ", formData);
  // Parameters for the admin email
  const adminTemplateParams = {
    name: formData.name,
    contact: formData.contact,
    startDate: formData.startDate,
    endDate: formData.endDate,
    pickUp: formData.pickup,
    destination: formData.destination,
  };

  console.log("serviceId: ", serviceId?.toString());
  console.log("customerTemplateId: ", customerTemplateId?.toString());
  console.log("adminTemplateId: ", adminTemplateId?.toString());
  console.log("publicKey: ", publicKey?.toString());

  // Send email to the customer
  emailjs
    .send(
      serviceId?.toString(),
      customerTemplateId?.toString(),
      templateParams,
      publicKey?.toString()
    )
    .then((response) => {
      console.log("Customer email sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending customer email:", error);
      alert("Failed to send message to customer.");
    });

  // Send email to the admin
  emailjs
    .send(
      serviceId.toString(),
      adminTemplateId.toString(),
      adminTemplateParams,
      publicKey.toString()
    )
    .then((response) => {
      console.log("Admin email sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending admin email:", error);
      alert("Failed to send message to admin.");
    });
};

export default sendMail;
