import axios from 'axios';

  // add payment
export const addToBuy = async (userId, orderData) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/payment/${userId}`, orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// see all payment
export const seeAllPayment = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/payment/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete payment
export const deletePayment = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/payment/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
