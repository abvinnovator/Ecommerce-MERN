// src/cartAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const addToCartAPI = async (productId, quantity) => {
  try {
    const response = await axios.post(`${API_URL}/cart/addtocart`, { productId, quantity }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromCartAPI = async (productId) => {
  try {
    const response = await axios.post(`${API_URL}/cart/removecart`, { productId }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCartAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart/showcart`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};