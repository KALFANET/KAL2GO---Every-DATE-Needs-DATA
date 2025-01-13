import axios from 'axios';

// יצירת ה-API_BASE_URL בצורה דינמית
const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/packages`;

// פונקציה לקבלת החבילות
export const getPackages = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching packages from API:", error);
        throw error;
    }
};

// פונקציה לסנכרון חבילות
export const syncPackages = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sync`);
        return response.data;
    } catch (error) {
        console.error("Error synchronizing packages:", error);
        throw error;
    }
};