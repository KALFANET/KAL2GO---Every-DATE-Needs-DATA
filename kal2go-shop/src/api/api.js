import axios from 'axios';

// יצירת ה-API_BASE_URL בצורה דינמית

// פונקציה לקבלת החבילות
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// פונקציה להבאת חבילות
export const fetchPackages = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/packages`);
        if (!response.ok) {
            throw new Error(`Failed to fetch packages: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching packages:', error);
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