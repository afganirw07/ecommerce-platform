import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';


export default function SearchResult() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchTerm = query.get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?search=${searchTerm}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

 return (
  <div className="px-7 mt-6 md:px-10 lg:px-30 xl:px-30 2xl:px-30">
    {/* Clean Search Header */}
    <div className=" pb-4">
      <h1 className="text-2xl font-semibold text-gray-900 font-[poppins] mb-2">
        Search Results
      </h1>
      <div className="flex items-center gap-2 text-gray-600">
        <span className="text-sm font-[poppins]">Keyword:</span>
        <span className="font-semibold text-red-600 text-sm">
          {searchTerm}
        </span>
        <span className="text-sm text-gray-500">({products.length} products)</span>
      </div>
    </div>

    {products.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-gray-500 font-[poppins]">
          No products found for the given keyword.
        </p>
      </div>
    ) : (
      <div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-md p-2 transition cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[140px] object-contain"
                />
              </div>
              <p className="font-[poppins] text-[14px] md:text-[16px] mt-2 mb-1 font-light leading-tight line-clamp-2">
                {product.title}
              </p>
              <p className="font-[poppins] text-xs md:text-sm opacity-40">
                Lowest Ask
              </p>
              <p className="text-[18px] md:text-[20px] font-bold mb-1">
                Rp {product.retailPrice}
              </p>
              <div className="flex items-center space-x-2 font-[poppins] text-xs md:text-sm">
                <div className="inline-flex items-center space-x-1 bg-gray-100 text-xs px-2 py-1 rounded-md">
                  <span>{Math.floor(Math.random() * 999) + 1} Sold</span>
                </div>
                <div className="inline-flex items-center space-x-1 bg-gray-100 text-xs px-2 py-1 rounded-md">
                  <Rocket size={15} className="text-gray-900" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

}