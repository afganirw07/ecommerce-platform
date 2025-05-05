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
        setProducts(data);
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
    <div className="px-30 py-5">
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
            className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm w-72 mt-2"
            role="tooltip"
          >
            <p>This section displays a list of products recommended for you based on your interests.</p>
          </div>
        )}
      </div>

        {/* bagian product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product._id} className="rounded-md p-2 relative transition">
            <div className="relative">
                {/* gambar product */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-36 object-contain"
              />
              <button className="absolute top-2 right-2 text-gray-900 hover:text-red-500">
                <Heart size={20} />
              </button>
            </div>
            {/* nama barang */}
            <p className="font-[poppins] text-[15px] mt-2 mb-1 text-light leading-tight line-clamp-2">
              {product.title}
            </p>
            <p className="font-[poppins] text-sm opacity-40">Lowest Ask</p>
            {/* bagian harga */}
            <p className="text-[25px] font-bold">${product.retailPrice}</p>
            <div className="mt inline-flex items-center space-x-1 bg-gray-100 text-xs px-2 py-1 rounded">
              <Rocket size={15} className="text-gray-900" />
              <span>Xpress Ship</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecomend;
    