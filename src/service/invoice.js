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