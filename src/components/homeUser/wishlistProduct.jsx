import React, { useEffect, useState, useRef } from 'react';
import { Rocket, Ellipsis  } from 'lucide-react';

const WishlistProduct = () => {
  const [wishlist, setWishlist] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setWishlist(data);
      } catch (error) {
        console.error('Gagal mengambil wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (id) => {
    console.log('Clicked product:', id);
  };

  return (
    <div className="px-7 font-[poppins] md:px-10 lg:px-30 xl:px-30 2xl:px-30">
      <div className="flex flex-col mt-10 md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 ">All Favorites</h1>
          <p className="text-sm text-gray-600">{wishlist.length} Items</p>
        </div>
        <button className="px-4 py-2 font-semibold border border-gray-500 cursor-pointer rounded-full text-sm font-medium hover:bg-gray-100 transition">
          Add Item
        </button>
      </div>

      <div className="flex flex-wrap justify-end items-center gap-2 mb-6">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-200 transition">
          <span className="text-sm font-semibold text-gray-800 mr-1">Sort By:</span>
          <span className="text-sm text-gray-600 mr-1">Recently Added</span>
          <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div className="flex space-x-2">
          <button className="p-2 rounded hover:bg-gray-200 transition bg-gray-200">
            <svg className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h7M13 6h7M4 12h7M13 12h7M4 18h7M13 18h7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:min-w-0">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="rounded-md p-2 relative transition cursor-pointer"
            onClick={() => handleProductClick(product._id)}
          >
            <div className="relative">
              <img
                src={product.image || '/placeholder.jpg'}
                alt={product.title}
                className="w-full h-[140px] object-contain"
              />
            </div>

<div className="flex justify-between items-center mt-3">
  <button className="px-4 py-2 font-semibold border border-gray-500 cursor-pointer rounded-full text-sm font-medium hover:bg-gray-100 transition">
    Buy Now
  </button>

  {/* Dropdown Option Button */}
  <div className="relative inline-block text-left" ref={menuRef}>
    <button
      onClick={(e) => {
        e.stopPropagation();
        setOpenDropdown(openDropdown === product._id ? null : product._id);
      }}
      className="px-3 py-2 font-semibold rounded-full hover:bg-gray-100 transition"
    >
      <Ellipsis  className="w-5 h-5" />
    </button>

    {openDropdown === product._id && (
      <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
          Edit
        </button>
        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
          Hapus
        </button>
      </div>
    )}
  </div>
</div>


            <p className="font-[poppins] text-[14px] md:text-[16px] mt-2 mb-1 font-light leading-tight line-clamp-2">
              {product.title}
            </p>
            <p className="text-[18px] md:text-[20px] font-bold mb-1">${product.retailPrice}</p>
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

export default WishlistProduct;
