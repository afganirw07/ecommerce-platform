import axios from 'axios';

// Add item to cart
const addToCart = async (user, productId, quantity, color, size) => {
  try {
    const response = await axios.post('http://localhost:5000/api/cart/add', {
      user,
      productId,
      quantity,
      color,
      size,
    });
    console.log('Cart updated:', response.data);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

// Delete item from cart
export const deleteFromCart = async (userId, productId, size) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}/${size}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting from cart:", err);
    throw err;
  }
};


export default addToCart;
