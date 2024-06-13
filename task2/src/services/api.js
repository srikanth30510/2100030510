
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

export const register = async () => {
   
};

export const fetchProducts = async (category, company, minPrice, maxPrice) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
            params: { category, company, minPrice, maxPrice }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};
