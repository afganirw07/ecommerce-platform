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
export const deleteFromCart = async (userId, productId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/cart/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export default addToCart;
