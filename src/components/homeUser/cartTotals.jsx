import React, { useState } from "react";
import { validateCoupon } from "../../service/couponAPI"; 

const CartTotals = ({ calculateTotal }) => {
  const storePickup = 5;
  const tax = 10;

  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState(null);
  const [message, setMessage] = useState("");

  const originalTotal = calculateTotal();
  let discountValue = 0;

  if (discountType === "percentage") {
    discountValue = (originalTotal * discount) / 100;
  } else if (discountType === "fixed") {
    discountValue = discount;
  }

  const finalTotal = Math.max(originalTotal - discountValue + storePickup + tax, 0);

  const applyCoupon = async () => {
    try {
      const data = await validateCoupon(voucherCode);
      setDiscount(data.discount);
      setDiscountType(data.type);
      setMessage(`Kupon "${data.code}" berhasil diterapkan!`);
    } catch (err) {
      setDiscount(0);
      setDiscountType(null);
      setMessage(err.response?.data?.error || "*Kupon tidak valid.");
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-xs xl:max-w-sm 2xl:max-w-md ml-auto space-y-6">
      <div className="space-y-4 rounded-lg border border-gray-300 p-4 shadow-md bg-white">
        <p className="text-xl font-semibold text-gray-800">Cart Totals</p>

        <div className="space-y-4">
          <dl className="flex items-center justify-between text-sm sm:text-base">
            <dt className="text-gray-600">Original Price</dt>
            <dd className="font-medium text-gray-800">${originalTotal.toFixed(2)}</dd>
          </dl>
          <dl className="flex items-center justify-between text-sm sm:text-base">
            <dt className="text-gray-600">Discount</dt>
            <dd className="font-medium text-red-500">-${discountValue.toFixed(2)}</dd>
          </dl>
          <dl className="flex items-center justify-between text-sm sm:text-base">
            <dt className="text-gray-600">Store Pickup</dt>
            <dd className="font-medium text-gray-800">${storePickup.toFixed(2)}</dd>
          </dl>
          <dl className="flex items-center justify-between text-sm sm:text-base">
            <dt className="text-gray-600">Tax</dt>
            <dd className="font-medium text-gray-800">${tax.toFixed(2)}</dd>
          </dl>

          <dl className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm sm:text-base">
            <dt className="font-bold text-gray-900">Total</dt>
            <dd className="font-bold text-gray-900">${finalTotal.toFixed(2)}</dd>
          </dl>
        </div>

        <a
          href="#"
          className="block w-full text-center rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition"
        >
          Proceed to Checkout
        </a>

        <div className="flex justify-center items-center gap-2">
          <span className="text-sm text-gray-600">or</span>
          <a
            href="#"
            className="text-sm font-medium text-red-500 hover:underline flex items-center gap-1"
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

      <div className="rounded-lg border border-gray-300 p-4 shadow-md bg-white">
        <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-800">
          Do you have a voucher or gift card?
        </label>
        <input
          type="text"
          id="voucher"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="block w-full rounded-md border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-800 focus:ring-red-500 focus:border-red-500"
          placeholder="Voucher Code"
        />
        <button
          type="button"
          onClick={applyCoupon}
          className="mt-4 w-full cursor-pointer rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition"
        >
          Apply Code
        </button>
        {message && (
          <p className="mt-2 text-sm text-red-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CartTotals;
