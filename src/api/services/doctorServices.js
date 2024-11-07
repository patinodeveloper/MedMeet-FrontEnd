import { API_BASE_URL } from "../config.js";

    const URL = `${API_BASE_URL}/doctors`;

export const getDoctors = async () => {
    const response = await fetch(URL);
    const doctors = await response.json();
    
    return doctors;
};


