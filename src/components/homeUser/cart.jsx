import React, { useState, useEffect } from 'react';
import CartTotals from './cartTotals';
import { deleteFromCart } from '../../service/cartAPI';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;
        if (!userId) throw new Error('User ID not found');

        const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
        const data = await response.json();

        if (Array.isArray(data.items)) {
          setCartItems(data.items);
        } else {
          throw new Error('Cart data is not an array');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  // delete product from cart
  const handleRemoveItem = async (item) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id;
      if (!userId) throw new Error('User ID not found');

      const productId = item.productId._id;
      const size = item.size

      await deleteFromCart(userId, productId, size);

      // update cart
      setCartItems((prevItems) =>
  prevItems.filter((i) => !(i.productId._id === productId && i.size === size))
);

    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };


  // Handle quantity change
  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity + delta > 0
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.productId.retailPrice);
      const quantity = parseInt(item.quantity, 10);
      return (!isNaN(price) && !isNaN(quantity)) ? total + price * quantity : total;
    }, 0);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 font-[poppins] lg:grid-cols-12 gap-3 py-10 max-w-7xl mx-auto sm:px-6 px-4">


      {/* Cart Items */}
      <div className="lg:col-span-8 space-y-4">
        <div className="hidden lg:flex justify-between text-5sm font-semibold uppercase border-b border-gray-300 pb-2 mb-4">
          <span className="w-1/3 text-left pl-9">Product</span>
          <span className="w-1/5 text-center">Price</span>
          <span className="w-1/5 text-center">Quantity</span>
          <span className="w-1/5 text-center">Subtotal</span>
        </div>
        
        {cartItems.length === 0 ? (
  <div className="col-span-5 text-center text-gray-500 text-lg font-medium py-10">
    You have no items in cart
  </div>
) : (
  cartItems.map((item) => {
          const price = parseFloat(item.productId.retailPrice);
          const quantity = parseInt(item.quantity, 10);
          const subtotal = (!isNaN(price) && !isNaN(quantity)) ? price * quantity : 0;

          return (
            <div key={item._id} className="flex flex-col sm:flex-row justify-between gap-4 py-4 border-b border-gray-300">
              {/* Mobile Layout */}
              <div className="flex sm:hidden gap-4 items-start">
                <img src={item.productId.image} alt={item.productId.title} className="w-24 h-24 object-contain rounded-md" />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs sm:text-sm font-semibold">{item.productId.title}</p>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium"></span> {item.color} &nbsp;|&nbsp;
                        <span className="font-medium"></span> {item.size}
                      </p>

                      <p className="text-sm text-gray-800 mt-1">Price: ${item.productId.retailPrice}</p>
                    </div>
                    <button
                      className="text-lg font-bold text-gray-500 hover:text-red-600"
                      onClick={() => handleRemoveItem(item)}
                    >
                      ×
                    </button>
                  </div>
                  

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <button
                        className="w-7 h-7 border border-gray-300 bg-white hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item._id, -1)}
                      >-</button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        className="w-7 h-7 border border-gray-300 bg-white hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item._id, 1)}
                      >+</button>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      Subtotal: ${subtotal.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center gap-3 w-1/3">
                <button
                  className="text-xl font-bold text-gray-600 hover:text-red-500"
                  onClick={() => handleRemoveItem(item)}
                >
                  ×
                </button>
                <img src={item.productId.image} alt={item.productId.title} className="w-16 h-16 object-contain" />
                <div>
                  <p className="text-[13px] font-medium">{item.productId.title}</p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium"></span> {item.color} &nbsp;|&nbsp;
                    <span className="font-medium"></span> {item.size}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-center w-1/5">
                <span className="text-sm font-medium">${item.productId.retailPrice}</span>
              </div>

              <div className="hidden sm:flex flex-col items-center w-1/5">
                <div className="flex items-center gap-1">
                  <button
                    className="w-7 h-7 border border-gray-300 bg-white hover:bg-gray-100"
                    onClick={() => handleQuantityChange(item._id, -1)}
                  >-</button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button
                    className="w-7 h-7 border border-gray-300 bg-white hover:bg-gray-100"
                    onClick={() => handleQuantityChange(item._id, 1)}
                  >+</button>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-center w-1/5">
                <span className="text-sm font-medium text-gray-800">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
            </div>
            
          );
        }))}
      </div>

      {/* Cart Totals */}
      <div className="lg:col-span-4 w-full">
        <CartTotals cartItems={cartItems} calculateTotal={calculateTotal} />
      </div>
    </div>
  );
};

export default Cart;
