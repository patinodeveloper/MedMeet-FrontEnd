import { API_BASE_URL } from "../config.js";

    const URL = `${API_BASE_URL}/doctors`;

export const getDoctors = async () => {
    const response = await fetch(URL);
    const doctors = await response.json();
    
    return doctors;
};

// export const getDoctorsPages = async (page = 0) => {
//     const response = await fetch(`${URL}/page/${page}`);
//     const doctors = await response.json();
    
//     return doctors;
// };
