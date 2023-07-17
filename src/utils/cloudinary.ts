export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "l9zljedh");
  return await fetch(`https://api.cloudinary.com/v1_1/due5voxrj/image/upload`, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    body: formData,
  });
};
