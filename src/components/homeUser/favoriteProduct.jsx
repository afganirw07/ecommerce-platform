import React, { useEffect, useState, useRef } from 'react';
import { Rocket, Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { deleteFromFavorite } from '../../service/favoriteAPI';
import toast, { Toaster } from 'react-hot-toast';


const FavoriteProducts = () => {
  const [wishlist, setWishlist] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
  const favoritesProduct = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;
      if (!userId) throw new Error('User ID not found');

      const res = await fetch(`http://localhost:5000/api/favorites/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch favorite items');

      const data = await res.json();

      toast.success('Successfully fetched favorite items');

      if (Array.isArray(data.items)) {
        setWishlist(data.items);
      } else {
        throw new Error('Favorite data is not an array');
      }
    } catch (error) {
      toast.error('Failed to fetch favorite items');
    }
  };

  favoritesProduct();
}, []);

  // handle remove from favorites
const handleRemoveFromFavorites = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id || user?.id;

    const response = await deleteFromFavorite(userId, productId);
    toast.success('Successfully removed from favorites');
    if (response) {
      // Hapus dari state berdasarkan productId di dalam productId object
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.productId._id !== productId)
      );
      setOpenDropdown(null);
    }
  } catch (error) {
    toast.error('Failed to remove from favorites');
    console.error('Error removing from favorites:', error);
  }
};



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // handle navigate detail product
  const navigate = useNavigate();
  const handleDetailProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="px-7 font-[poppins] md:px-10 lg:px-30 xl:px-30 2xl:px-30">
      <Toaster position="top-center" />
      <div className="flex flex-col mt-10 md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 ">
            All Favorites
          </h1>
          <p className="text-sm text-gray-600">{wishlist.length} Items</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-end items-center gap-2 mb-6">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-200 transition">
          <span className="text-sm font-semibold text-gray-800 mr-1">
            Sort By:
          </span>
          <span className="text-sm text-gray-600 mr-1">Recently Added</span>
          <svg
            className="h-4 w-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <div className="flex space-x-2">
          <button className="p-2 rounded hover:bg-gray-200 transition bg-gray-200">
            <svg
              className="h-5 w-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h7M13 6h7M4 12h7M13 12h7M4 18h7M13 18h7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:min-w-0">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="rounded-md p-2 relative transition"
          >
            <div className="relative cursor-pointer">
              <img
                src={product.productId.image || '/placeholder.jpg'}
                alt={product.title}
                className="w-full h-[140px] object-contain"
                onClick={() => handleDetailProduct(product._id)}
              />
            </div>

            <div className="flex justify-between items-center mt-3">
        <button
  className="
    font-[poppins] flex items-center justify-center
    border border-gray-500 rounded-full cursor-pointer hover:bg-gray-100 transition
      whitespace-nowrap

    w-20 h-8 text-[10px] font-semibold         
    sm:w-30 sm:h-10 sm:text-xs sm:font-semibold
    md:w-auto md:h-auto md:px-6 md:py-2 md:text-sm
    lg:w-[90px] lg:px-7 lg:py-2.5 lg:text-base
    xl:w-[110px] xl:px-8 xl:py-3 xl:text-base
  "
>
  Buy Now
</button>

              {/* Dropdown Option Button */}
              <div className="relative inline-block text-left" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(
                      openDropdown === product._id ? null : product._id
                    );
                  }}
                  className="px-3 cursor-pointer py-2 font-semibold rounded-full "
                >
                  <Ellipsis size={40}  />
                </button>

                {openDropdown === product._id && (
                  <div className="absolute right-0 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Share
                    </button>
                    <button onClick={() => handleRemoveFromFavorites(product.productId._id)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p  onClick={() => handleDetailProduct(product._id)} className="font-[poppins] text-[14px] md:text-[16px] mt-2 mb-1 font-light leading-tight line-clamp-2">
              {product.productId.title}
              
            </p>
            <p  onClick={() => handleDetailProduct(product._id)} className="text-[18px] md:text-[20px] font-bold mb-1">
              ${product.productId.retailPrice}
            </p>
            <div className="flex items-center space-x-2 font-[poppins] text-xs md:text-sm">
              <div className="inline-flex items-center space-x-1 bg-gray-100 text-xs px-2 py-1 rounded-md">
                <p>
                  <span className="font-semibold">Size: </span>
                  {product.size || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteProducts;
