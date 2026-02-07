const cloudName = "dnw1ttr02";
const upload_preset = "wjs1zyo5";

const uploadImg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset); // Replace with your Cloudinary upload preset

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // Replace `your_cloud_name`
    {
      method: "POST",
      body: formData,
    }
  );

  console.log("Form data: ", formData);

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.secure_url; // The uploaded image's secure URL
};

export default uploadImg;
