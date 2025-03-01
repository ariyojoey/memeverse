import axios from "axios";

const API_URL = "https://api.imgflip.com/get_memes"; // Example API

export const fetchMemes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data.memes; // Extract memes array
  } catch (error) {
    console.error("Error fetching memes:", error);
    return [];
  }
};
