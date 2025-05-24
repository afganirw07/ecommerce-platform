import { useState, useEffect } from 'react';
import { seeAllPayment } from '../../service/payment'; // sesuaikan path-nya

export default function Payment({ userId }) {
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

  const [orderSummary, setOrderSummary] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]); // Tambah state yang hilang
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const currentUserId = userId || user?.id || user?._id; // Support multiple ID formats

        if (!currentUserId) {
          throw new Error('User ID not found');
        }

        console.log('Fetching payment data for userId:', currentUserId);

        const response = await fetch(`http://localhost:5000/api/payment/${currentUserId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Payment data received:', data);

        if (Array.isArray(data)) {
          setPaymentHistory(data);
          // Jika ada data, ambil order terbaru untuk summary
          if (data.length > 0) {
            setOrderSummary(data[data.length - 1]); // Ambil order terbaru
          } else {
            // Jika tidak ada data, set default order summary
            setOrderSummary({
              products: [],
              subtotal: 0,
              discount: 0,
              shipping: {
                method: 'Standard Shipping',
                estimate: '3-5 business days'
              },
              total: 0,
              paymentMethod: 'Credit Card'
            });
          }
        } else if (data && typeof data === 'object') {
          // Jika response adalah single object (order terbaru)
          setOrderSummary(data);
          setPaymentHistory([data]);
        } else {
          throw new Error('Invalid payment data format');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setError(`Failed to load payment data: ${error.message}`);
        setLoading(false);
        
        // Set default order summary untuk development/testing
        setOrderSummary({
          products: [],
          subtotal: 0,
          discount: 0,
          shipping: {
            method: 'Standard Shipping',
            estimate: '3-5 business days'
          },
          total: 0,
          paymentMethod: 'Credit Card'
        });
      }
    };

    fetchPaymentData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    console.log('Order summary:', orderSummary);
    // Kirim data ke backend jika perlu
  };

  if (loading) {
    return (
      <div className="max-w-6xl mt-8 mx-auto p-4 font-[poppins] flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mt-8 mx-auto p-4 font-[poppins]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Jika orderSummary masih null, tampilkan loading
  if (!orderSummary) {
    return (
      <div className="max-w-6xl mt-8 mx-auto p-4 font-[poppins] flex justify-center items-center">
        <p className="text-gray-600">No order data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mt-8 mx-auto p-4 font-[poppins]">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-bold mb-6">Billing details</h2>
          
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name (optional)
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province *
              </label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postcode *
              </label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Notes (optional)
              </label>
              <textarea
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Notes about your order, e.g. special notes for delivery."
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-20 md:w-1/3">
          <div className="bg-white border border-red-200 shadow-lg rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
              <h2 className="text-xl font-bold text-white tracking-wide">ORDER SUMMARY</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4 pb-3 border-b border-red-100">
                <span className="font-bold text-sm uppercase tracking-wider">Product</span>
                <span className="font-bold text-sm uppercase tracking-wider">Price</span>
              </div>
              <div className="space-y-3 mb-6">
                {orderSummary.products && orderSummary.products.length > 0 ? (
                  orderSummary.products.map((product, index) => (
                    <div key={product.productId || index} className="flex justify-between items-center py-2">
                      <span className="text-gray-800 font-medium">
                        {product.name} x {product.quantity}
                      </span>
                      <span className="text-gray-900 font-semibold">
                        ${(product.price * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No products in order</p>
                )}
              </div>
              <div className="space-y-4 border-t border-red-100 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">${orderSummary.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-red-600 font-medium">-${orderSummary.discount?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <div className="text-right">
                    <div className="text-gray-800 font-medium">{orderSummary.shipping?.method || 'Standard Shipping'}</div>
                    <div className="text-xs text-gray-500">{orderSummary.shipping?.estimate || '3-5 business days'}</div>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-red-200 mt-6 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold">${orderSummary.total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                  <span className="text-sm font-semibold text-red-800">Secure Payment</span>
                </div>
                <p className="text-sm text-gray-700 mb-4 font-medium">{orderSummary.paymentMethod || 'Credit Card'}</p>
              </div>
            </div>
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