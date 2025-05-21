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
          <div className="bg-gray-100 p-6 rounded">
            <h2 className="text-xl font-bold mb-6">YOUR ORDER</h2>
            
            <div className="flex justify-between mb-2">
              <span className="font-semibold">PRODUCT</span>
              <span className="font-semibold">SUBTOTAL</span>
            </div>
            
            <div className="border-t border-gray-300 py-3">
              <div className="flex justify-between mb-2">
                <span>Jordan 1 Low Travis Scott x Fragment</span>
                <span>$ 1,245</span>
              </div>
              <div className="flex justify-between">
                <span>Jordan Rookie of the Year</span>
                <span>$ 1,444</span>
              </div>
            </div>
            
            <div className="border-t border-gray-300 py-3 flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold">$ 3,000</span>
            </div>
            
            <div className="border-t border-gray-300 py-3 flex justify-between">
              <span className="font-semibold">Shipping</span>
              <span className="text-sm text-gray-600">Enter your address to view shipping options</span>
            </div>
            
            <div className="border-t border-gray-300 py-3 flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">$ 3,000</span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Automatic Payment Credit Card / Virtual Account</span>
              </div>
              <div className="flex gap-2 mb-4">
                <img src="/api/placeholder/40/25" alt="Visa" className="h-6" />
                <img src="/api/placeholder/40/25" alt="Mastercard" className="h-6" />
                <img src="/api/placeholder/40/25" alt="JCB" className="h-6" />
                <img src="/api/placeholder/40/25" alt="American Express" className="h-6" />
              </div>
            </div>
            
            <button 
              onClick={handleSubmit} 
              className="w-full bg-red-500 text-white py-3 rounded text-center font-semibold"
            >
              CONFIRMATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}