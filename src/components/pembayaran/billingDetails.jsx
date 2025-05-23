import { useState } from 'react';

export default function Payment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    province: '',
    subdistrict: '',
    streetAddress: '',
    postcode: '',
    phone: '',
    email: '',
    orderNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-6xl mt-8 mx-auto p-4 font-[poppins]">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Billing Details Form */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-bold mb-6">Billing details</h2>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">First Name <span className='font-bold text-red-500'>*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Last Name <span className='font-bold text-red-500'>*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Company name (optional)</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Country / Region <span className='font-bold text-red-500'>*</span></label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Province <span className='font-bold text-red-500'>*</span></label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Subdistrict (optional)</label>
              <input
                type="text"
                name="subdistrict"
                value={formData.subdistrict}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Street address <span className='font-bold text-red-500'>*</span></label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

             <div className="mb-4">
              <label className="block text-sm mb-1">Postcode / ZIP <span className='font-bold text-red-500'>*</span></label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Phone <span className='font-bold text-red-500'>*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Email address <span className='font-bold text-red-500'>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Order notes (optional)</label>
              <textarea
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 p-2 rounded"
              ></textarea>
            </div>
          </div>
        </div>

       {/* Order Summary */}
        <div className="w-full mt-20 md:w-1/3">
          <div className="bg-white border border-red-200 shadow-lg rounded-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
              <h2 className="text-xl font-bold text-white tracking-wide">ORDER SUMMARY</h2>
            </div>
            
            <div className="p-6">
              {/* Product Header */}
              <div className="flex justify-between mb-4 pb-3 border-b border-red-100">
                <span className="font-bold  text-sm uppercase tracking-wider">Product</span>
                <span className="font-bold  text-sm uppercase tracking-wider">Price</span>
              </div>
              
              {/* Products */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-800 font-medium">Lorem Ipsum</span>
                  <span className="text-gray-900 font-semibold">$1,245</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-800 font-medium">Lorem Ipsum</span>
                  <span className="text-gray-900 font-semibold">$1,444</span>
                </div>
              </div>
              
              {/* Calculations */}
              <div className="space-y-4 border-t border-red-100 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">$2,689</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-red-600 font-medium">-$3,000</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <div className="text-right">
                    <div className="text-gray-800 font-medium">Express Shipping</div>
                    <div className="text-xs text-gray-500">2-3 business days</div>
                  </div>
                </div>
              </div>
              
              {/* Total */}
              <div className="border-t-2 border-red-200 mt-6 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold ">Total</span>
                  <span className="text-2xl font-bold ">$3,000</span>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                  <span className="text-sm font-semibold text-red-800">Secure Payment</span>
                </div>
                <p className="text-sm text-gray-700 mb-4 font-medium">Credit Card / Virtual Account</p>
                
                {/* Payment Icons - Clean Layout */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-red-200 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
                    <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-red-200 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
                    <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-red-200 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
                    <div className="w-8 h-5 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">JCB</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-red-200 shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
                    <div className="w-8 h-5 bg-blue-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AMEX</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mt-3 text-center">
                  Safe & secure payment processing
                </p>
              </div>
            </div>
            
            {/* Confirmation Button */}
            <div className="p-6 pt-0">
              <button 
                onClick={handleSubmit} 
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-lg text-center font-semibold uppercase tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}