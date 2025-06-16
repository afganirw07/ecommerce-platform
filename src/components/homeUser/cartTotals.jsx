import React from "react";
import { useNavigate } from "react-router-dom";
import { addToBuy } from '../../service/payment';
import toast, { Toaster } from 'react-hot-toast';
import { deleteCart } from "../../service/cartAPI";

const CartTotals = ({ cartItems, calculateTotal }) => {
  const storePickup = 5;
  const tax = 10;

  const originalTotal = typeof calculateTotal === "function" ? calculateTotal() : 0;
  const safeOriginalTotal = isNaN(originalTotal) ? 0 : originalTotal;

  const finalTotal = Math.max(safeOriginalTotal + storePickup + tax, 0);

  const navigate = useNavigate();

  const handleToHome = () => {
    navigate("/");
  };

  const handleBuyNow = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id || user?.id;

    if (!userId) {
      toast.error('Please login to place an order');
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const products = cartItems.map((item) => ({
      productId: item.productId._id,
      name: item.productId.title,
      price: item.productId.retailPrice,
      quantity: item.quantity,
      size: item.size,
      colorway: item.productId.colorway || 'N/A',
    }));

    const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const total = subtotal + storePickup + tax;

    const orderData = {
      products,
      subtotal,
      discount: 0,
      pickup: storePickup,
      shipping: {
        method: 'Express Shipping',
        estimate: '2-3 business days',
      },
      total,
      paymentMethod: 'Credit Card / Virtual Account',
    };

    try {
      await addToBuy(userId, orderData);
      await deleteCart(userId);
      toast.success('Order created successfully!');
      setTimeout(() => navigate('/payment'), 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to create order');
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-xs xl:max-w-sm 2xl:max-w-md ml-auto space-y-6">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="space-y-4 rounded-lg border border-gray-300 p-4 bg-white">
        <p className="text-xl font-semibold text-gray-800">Cart Totals</p>

        <div className="space-y-4">
          <dl className="flex items-center justify-between text-sm sm:text-base">
            <dt className="text-gray-600">Original Price</dt>
            <dd className="font-medium text-gray-800">${originalTotal.toFixed(2)}</dd>
          </dl>
          <dl className="flex items-center justify-between text-sm sm:text-base">
            <dt className="text-gray-600">Store Pickup</dt>
            <dd className="font-medium text-gray-800">
              ${safeOriginalTotal === 0 ? '0.00' : storePickup.toFixed(2)}
            </dd>
          </dl>
          <dl className="flex items-center justify-between text-sm sm:text-base">
            <dt className="text-gray-600">Tax</dt>
            <dd className="font-medium text-gray-800">
              ${safeOriginalTotal === 0 ? '0.00' : tax.toFixed(2)}
            </dd>
          </dl>
          <dl className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm sm:text-base">
            <dt className="font-bold text-gray-900">Total</dt>
            <dd className="font-bold text-gray-900">
              ${safeOriginalTotal === 0 ? '0.00' : finalTotal.toFixed(2)}
            </dd>
          </dl>
        </div>

        <button
          onClick={handleBuyNow}
          className="block w-full rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition"
        >
          Proceed to Checkout
        </button>

        <div className="flex justify-center items-center gap-2">
          <span className="text-sm text-gray-600">or</span>
          <a
            href="#"
            className="text-sm font-medium text-red-500 hover:underline flex items-center gap-1"
            onClick={handleToHome}
          >
            Continue Shopping
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
