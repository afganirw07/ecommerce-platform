import axios from "axios";

// add item to favorites
export const addToFavorite = async (user, productId, size) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/favorites/add`, {
      user,
      productId,
      size,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};


// delete item from favorites
export const deleteFromFavorite = async (userID, productId, size) => {
    try {
        const response = await axios.delete(
            `http://localhost:5000/api/favorites/remove/${userID}/${productId}/${size}` );
        return response.data;
    } catch (error) {
        console.error("Error removing item from favorite:", error);
        throw error;
    }
};


