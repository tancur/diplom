import { API_URL } from "./shopApiUrl";

export const  uploadPost= async (formData) =>{
  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: localStorage.authToken
      ? { Authorization: "Bearer " + localStorage.authToken }
      : {},
    body: formData,
  });
  const data = await response.json();
  return data;
  // console.log(data)
}
  
