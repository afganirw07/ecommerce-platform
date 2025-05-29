import axios from "axios";

// add invoice
export const addInvoice = async (userId, invoiceData) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/invoice/add/${userId}`, invoiceData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete invoice
export const deleteInvoice = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/invoice/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}