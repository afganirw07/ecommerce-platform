import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import addToCart from '../../service/cartAPI';
import { addToFavorite } from '../../service/favoriteAPI';
import { addToBuy } from '../../service/payment';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id || user?.id;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Validasi id tidak kosong dan bukan 'payment'
    if (!id || id === 'payment') {
      console.error('Invalid product ID:', id);
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchUrl = `http://localhost:5000/api/products/${id}`;
    console.log('Fetching from URL:', fetchUrl);

    fetch(fetchUrl)
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // masukin ke keranjang
  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add items to your cart');
        return;
      }
      await addToCart(userId, product._id, quantity, product.colorway || 'N/A', selectedSize);
      toast.success('Successfully added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  // masukin ke favorit
  const handleAddToFavorite = async () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!userId) {
      toast.error('Please login to add items to your favorites');
      return;
    }
    try {
      await addToFavorite(userId, product._id, selectedSize);
      toast.success('Successfully added to favorites!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Product already in favorites!');
      } else {
        console.error('Error adding to favorites:', error);
        toast.error('Failed to add to favorites');
      }
    }
  };

  const handleBuyNow = async () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!userId) {
      toast.error('Please login to place an order');
      return;
    }

    const orderData = {
      products: [
        {
          productId: product._id,
          name: product.title,
          price: product.retailPrice,
          quantity,
          size: selectedSize,
          colorway: product.colorway || 'N/A',
        },
      ],
      subtotal: product.retailPrice * quantity,
      discount: null,
      pickup: null,
      shipping: {
        method: 'Express Shipping',
        estimate: '2-3 business days',
      },
      total: product.retailPrice * quantity,
      paymentMethod: 'Credit Card / Virtual Account',
    };

    try {
      await addToBuy(userId, orderData);
      toast.success('Order successfully created!');
      setTimeout(() => {
        navigate('/payment')
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to create order');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-6 py-14 max-w-7xl mx-auto font-[Poppins] flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 py-14 max-w-7xl mx-auto font-[Poppins] flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error: {error}</p>
          <p className="text-gray-600 mt-2">Product ID: {id}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="p-6 py-14 max-w-7xl mx-auto font-[Poppins] flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Product not found</p>
          <p className="text-gray-500 mt-2">ID: {id}</p>
        </div>
      </div>
    );
  }

  //   categori
  const categorySizeMap = {
    'Streetwear Apparel': ['S', 'M', 'L', 'XL'],
    Sneakers: ['US 7', 'US 8', 'US 9', 'US 10'],
    'Running Shoes': ['US 7', 'US 8', 'US 9', 'US 10'],
    Basketball: ['US 7', 'US 8', 'US 9', 'US 10'],
    'Skateboarding Sneakers': ['US 7', 'US 8', 'US 9', 'US 10'],
    Skateboarding: ['US 7', 'US 8', 'US 9', 'US 10'],
    'Lifestyle Sneakers': ['US 7', 'US 8', 'US 9', 'US 10'],
    Accessories: ['One Sizes'],
    Running: ['US 7', 'US 8', 'US 9', 'US 10'],
    Sandals: ['US 7', 'US 8', 'US 9', 'US 10'],
  };

  const sizes = categorySizeMap[product.category] || [];

  return (
    <div className="p-6 py-14 max-w-7xl mx-auto font-[Poppins]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col md:flex-row px-5">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.title} className="w-full h-auto object-contain" />
        </div>

        <div className="md:w-1/2 md:pl-10">
          <div className="text-sm text-gray-500 mb-4">
            <span>
              {product.category} / {product.brand}
            </span>
          </div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-base text-gray-600 mt-2">{product.colorway}</p>
          <p className="text-2xl font-semibold mt-2 opacity-70">$ {product.retailPrice}</p>

          <div className="mt-4">
            <p className="font-[poppins] text-sm font-medium">{product.brand} Sizes:</p>
            <div className="flex gap-2 mt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border border-gray-300 rounded px-3 py-1 text-sm ${selectedSize === size ? 'bg-red-500 text-white' : 'bg-white cursor-pointer'
                    } hover:bg-red-500 hover:text-white`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center border rounded border-gray-300">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-lg cursor-pointer">
                -
              </button>
              <span className="px-4 py-2 text-lg ">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-lg cursor-pointer">
                +
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              className="bg-red-500 rounded text-white px-6 py-2 uppercase font-semibold cursor-pointer sm: hover:bg-red-700"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-4 flex gap-2 font-[poppins] font-semibold">
            <button
              onClick={handleAddToFavorite}
              className="border bg-green-500 rounded text-white px-6 uppercase py-2 cursor-pointer hover:bg-green-600"
            >
              Add To Favorites
            </button>
            <button
              onClick={handleAddToCart}
              className="border bg-red-500 rounded text-white px-6 py-2 cursor-pointer uppercase hover:bg-red-700"
            >
              Add To Cart
            </button>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
              <h2 className="text-lg font-semibold uppercase">Description</h2>
              <span>{isDescriptionOpen ? '▲' : '▼'}</span>
            </div>
            <hr className="my-2 border-t border-gray-300" />
            {isDescriptionOpen && (
              <>
                <h3 className="text-base font-semibold mt-3 uppercase">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              </>
            )}
            <hr className="mt-2 border-t border-gray-300" />
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              {' '}
              <span className="text-black font-semibold">SKU:</span> N/A
            </p>
            <p className="text-sm text-gray-600">
              {' '}
              <span className="text-black font-semibold">Categories:</span> {product.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;