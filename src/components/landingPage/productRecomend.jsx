import React, { useEffect, useState } from "react";
import { Heart, Rocket,CircleHelp } from "lucide-react"; 

const ProductRecomend = () => {
  const [products, setProducts] = useState([]);
  const [popover, setPopover] = useState(false);

  // fetch API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        // datanya di acak
      const shuffledData = data.sort(() => Math.random() - 0.5);
        setProducts(shuffledData.slice(0,5)); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handlePopoverToggle = () => {
    setPopover(!popover);
  };

  return (
    <div className="px-7 md:px-10 lg:px-30 xl:px-30 2xl:px-30 py-5">
      <div className="relative">
        <h2 className="font-[poppins] text-lg font-semibold mb-3 mt-3 inline-flex items-center ">
          Recommended For You
          <CircleHelp
            size={20}
            className="ml-2 text-gray-900 cursor-pointer"
            onMouseEnter={handlePopoverToggle} 
            onMouseLeave={handlePopoverToggle}
          />
        </h2>

        {/* popover */}
        {popover && (
          <div
            className="absolute z-10 -bottom-23 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm w-72 mt-2"
            role="tooltip"
          >
            <p>This section displays a list of products recommended for you based on your interests.</p>
          </div>
        )}
      </div>

       {/* bagian product */}
<div className="overflow-x-auto sm:overflow-visible">
  <div className="flex sm:grid sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 min-w-[600px] sm:min-w-0">
    {products.map((product) => (
      <div
        key={product._id}
        className="w-[200px] sm:w-auto shrink-0 sm:shrink rounded-md p-2 relative transition cursor-pointer"
      >
        <div className="relative">
          {/* gambar product */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[140px] object-contain"
          />
          <button className="absolute top-2 right-2 text-gray-900 hover:text-red-500 transition duration-300 cursor-pointer"> 
            <Heart size={20} />
          </button>
        </div>
        {/* nama barang */}
        <p className="font-[poppins] text-[14px] md:text-[16px] mt-2 mb-1 font-light leading-tight line-clamp-2">
          {product.title}
        </p>
        <p className="font-[poppins] text-xs md:text-sm opacity-40">Lowest Ask</p>
        {/* bagian harga */}
        <p className="text-[18px] md:text-[20px] font-bold mb-1">${product.retailPrice}</p>
        <div className="mt inline-flex items-center space-x-1 bg-gray-100 text-xs px-2 py-1 rounded">
          <Rocket size={15} className="text-gray-900" />
          <span>Xpress Ship</span>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default ProductRecomend;
    