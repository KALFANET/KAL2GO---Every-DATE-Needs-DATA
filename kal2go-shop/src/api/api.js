import axios from "axios";

// יצירת API_BASE_URL בצורה דינמית
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

// פונקציה להבאת חבילות
export const fetchPackages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error.message);
    throw error;
  }
};

// פונקציה להבאת פרטי חבילה לפי ID
export const fetchPackageDetails = async (packageId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages/${packageId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching package details:", error.message);
    throw error;
  }
};

// פונקציה לביצוע רכישה
export const createPurchase = async (packageId, price, customerEmail) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/purchase`, {
      packageId,
      price,
      customerEmail,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating purchase:", error.message);
    throw error;
  }
};