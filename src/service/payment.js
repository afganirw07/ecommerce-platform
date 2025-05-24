import axios from 'axios';

export const addToBuy = async (userId, orderData) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/payment/${userId}`, orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const seeAllPayment = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/payment/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
