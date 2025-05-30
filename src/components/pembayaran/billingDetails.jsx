import { useState, useEffect, useContext } from 'react';
import { seeAllPayment, deletePayment } from '../../service/payment';
import { useLocation, useNavigate } from 'react-router-dom';
import { UNSAFE_NavigationContext } from 'react-router-dom';
import { addInvoice } from '../../service/invoice';
import toast, { Toaster } from 'react-hot-toast';

export default function Payment({ userId }) {
  const navigation = useContext(UNSAFE_NavigationContext).navigator;
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    province: '',
    streetAddress: '',
    postcode: '',
    phone: '',
    email: '',
    orderNotes: '',
    shippingMethod: 'Standard Shipping',
    paymentMethod: '',
  });

  const [orderSummary, setOrderSummary] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false); // State untuk kontrol konfirmasi

  // Fetch payment data
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const currentUserId = userId || user?.id || user?._id;

        if (!currentUserId) throw new Error('User ID not found');

        const data = await seeAllPayment(currentUserId);

        if (Array.isArray(data)) {
          setPaymentHistory(data);

          if (data.length > 0) {
            const allProducts = [];
            let totalSubtotal = 0;
            let totalDiscount = 0;

            data.forEach((payment) => {
              const items = payment.items || payment.products || [];
              if (Array.isArray(items)) {
                items.forEach((item) => {
                  if (
                    item.productId &&
                    (item.name || item.productName) &&
                    item.price
                  ) {
                    allProducts.push({
                      ...item,
                      paymentId: payment._id,
                      paymentDate: payment.createdAt || payment.date,
                    });
                  }
                });
              }
              totalSubtotal += payment.subtotalProduct || payment.subtotal || 0;
              totalDiscount += payment.discount || 0;
            });

            const storePickup = 5;
            const tax = 10;
            const finalTotal =
              totalSubtotal - totalDiscount + storePickup + tax;

            setOrderSummary({
              products: allProducts,
              subtotal: totalSubtotal,
              subtotalProduct: totalSubtotal,
              discount: totalDiscount,
              storePickup,
              tax,
              shipping: {
                method: 'Standard Shipping',
                estimate: '3-5 busy days',
              },
              total: Math.max(finalTotal, 0),
              paymentMethod: 'Credit Card',
              totalPayments: data.length,
            });
          } else {
            setOrderSummary({
              products: [],
              subtotal: 0,
              subtotalProduct: 0,
              discount: 0,
              storePickup: 5,
              tax: 10,
              shipping: {
                method: 'Standard Shipping',
                estimate: '3-5 busy days',
              },
              total: 15,
              paymentMethod: 'Credit Card',
              totalPayments: 0,
            });
          }
        } else if (data && typeof data === 'object') {
          setOrderSummary(data);
          setPaymentHistory([data]);
        } else {
          throw new Error('Invalid payment data format');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching payment data:', err);
        setError(`Failed to load payment data: ${err.message}`);
        setLoading(false);
        setOrderSummary({
          products: [],
          subtotal: 0,
          subtotalProduct: 0,
          discount: 0,
          storePickup: 5,
          tax: 10,
          shipping: {
            method: 'Standard Shipping',
            estimate: '3-5 busy days',
          },
          total: 15,
          paymentMethod: 'Credit Card',
          totalPayments: 0,
        });
      }
    };

    fetchPaymentData();
  }, [userId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'country',
      'province',
      'streetAddress',
      'postcode',
      'phone',
      'email',
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return `Please fill in ${field
          .replace(/([A-Z])/g, ' $1')
          .toLowerCase()}`;
      }
    }
    if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      return 'Phone number must be 10-15 digits';
    }
    if (!/.+\@.+\..+/.test(formData.email)) {
      return 'Invalid email format';
    }
    return null;
  };

  // Add invoice - Modified dengan konfirmasi dan state control
  const handleAddInvoice = async () => {
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (!formData.paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    // Tambahkan konfirmasi sebelum proses order
    const confirmOrder = window.confirm(
      'Are you sure you want to confirm this order?'
    );
    if (!confirmOrder) {
      return; // Batalkan jika user memilih "Cancel"
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const currentUserId = userId || user?.id || user?._id;

      if (!currentUserId) throw new Error('User ID not found');

      const invoiceData = {
        user: currentUserId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        country: formData.country,
        province: formData.province,
        streetAddress: formData.streetAddress,
        postcode: formData.postcode,
        phone: formData.phone,
        email: formData.email,
        orderNotes: formData.orderNotes,
        items: orderSummary.products.map((product) => ({
          productId: product.productId || product._id,
          productName: product.name || product.productName || 'Unknown Product',
          size: product.size || 'Default',
          quantity: product.quantity || 1,
          unitPrice: product.price || 0,
          totalPrice: (product.price || 0) * (product.quantity || 1),
        })),
        subtotalProduct: orderSummary.subtotalProduct || 0,
        discount: orderSummary.discount || 0,
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod,
      };

      const response = await addInvoice(currentUserId, invoiceData);
      toast.success('Order confirmed successfully!');

      // Set flag bahwa order sudah dikonfirmasi
      setIsOrderConfirmed(true);

      // Hapus payment data sebelum navigasi
      try {
        await deletePayment(currentUserId);
      } catch (deleteErr) {
        console.error('Failed to delete payment data:', deleteErr);
      }

      // Navigasi setelah delay singkat untuk memastikan state terupdate
      setTimeout(() => {
        navigate('/confirmations');
      }, 100);
    } catch (err) {
      console.error('Error adding invoice:', err);
      toast.error(`Failed to add invoice: ${err.message}`);
    }
  };

  // Modified useEffect untuk konfirmasi leave page dengan state control
  useEffect(() => {
    const currentPath = location.pathname;

    // Event listener untuk browser refresh/close
    const handleBeforeUnload = (e) => {
      if (!isOrderConfirmed) {
        e.preventDefault();
        e.returnValue = 'Want to leave this page?';
        return 'Want to leave this page?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function untuk navigation
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

      const nextPath = window.location.pathname;
      if (currentPath !== nextPath && !isOrderConfirmed) {
        const confirmLeave = window.confirm('Want to leave this page?');
        if (!confirmLeave) {
          navigate(currentPath);
        } else {
          const user = JSON.parse(localStorage.getItem('user'));
          const currentUserId = userId || user?.id || user?._id;
          if (currentUserId) {
            deletePayment(currentUserId)
              .then(() => {
                console.log('All payments deleted on route change.');
              })
              .catch((err) => {
                console.error(
                  'Failed to delete payments on route change:',
                  err
                );
              });
          }
        }
      }
    };
  }, [location, navigate, userId, isOrderConfirmed]); // Tambahkan isOrderConfirmed ke dependency

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

  if (!orderSummary) {
    return (
      <div className="max-w-6xl mt-8 mx-auto p-4 font-[poppins] flex justify-center items-center">
        <p className="text-gray-600">No order data available</p>
      </div>
    );
  }

  // Payment methods
  const paymentMethods = [
    {
      id: 'visa',
      name: 'Visa',
      logo: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg',
    },
    {
      id: 'mastercard',
      name: 'Mastercard',
      logo: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg',
    },
    {
      id: 'amex',
      name: 'Paypal',
      logo: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg',
    },
    {
      id: 'jcb',
      name: 'JCB',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/450px-JCB_logo.svg.png',
    },
  ];
  return (
    <div className="max-w-6xl mt-8 mx-auto p-4 font-[poppins]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-bold mb-6">Billing details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postcode <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10,15}"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Method{' '}
                <span className="text-red-500 font-bold">*</span>
              </label>
              <select
                name="shippingMethod"
                value={formData.shippingMethod}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="Standard Shipping">Standard Shipping</option>
                <option value="Regular Shipping">Regular Shipping</option>
                <option value="Economy Shipping">Economy Shipping</option>
                <option value="Next Day Delivery">Next Day Delivery</option>
              </select>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                placeholder="Notes about your order, e.g. special notes for delivery."
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-20 md:w-1/3">
          <div className="bg-white border border-red-200 shadow-lg rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6">
              <h2 className="text-xl font-bold text-white tracking-wide">
                ORDER SUMMARY
              </h2>
              {orderSummary.totalPayments > 0 && (
                <p className="text-red-100 text-sm mt-1">
                  From {orderSummary.totalPayments} payment(s)
                </p>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between mb-4 pb-3 border-b border-red-100">
                <span className="font-bold text-sm uppercase tracking-wider">
                  Product
                </span>
                <span className="font-bold text-sm uppercase tracking-wider">
                  Price
                </span>
              </div>
              <div className="space-y-3 mb-6">
                {orderSummary.products && orderSummary.products.length > 0 ? (
                  orderSummary.products.flatMap((product, index) => {
                    const qty = product.quantity || 1;
                    return Array.from({ length: qty }).map((_, i) => (
                      <div
                        key={`${
                          product.productId || product._id || index
                        }-${i}`}
                        className="flex justify-between items-center py-2"
                      >
                        <span className="text-gray-800 font-medium">
                          {product.productName ||
                            product.name ||
                            `Product ${index + 1}`}
                        </span>
                        <span className="text-gray-900 font-semibold pl-2">
                          $
                          {(product.unitPrice || product.price || 0).toFixed(2)}
                        </span>
                      </div>
                    ));
                  })
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No products in order
                  </p>
                )}
              </div>
              <div className="space-y-4 border-t border-red-100 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">
                    ${orderSummary.subtotal?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-red-600 font-medium">
                    -${orderSummary.discount?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Store Pickup</span>
                  <span className="text-gray-800 font-medium">
                    $
                    {orderSummary.products.length === 0
                      ? '0.00'
                      : orderSummary.storePickup?.toFixed(2) || '5.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800 font-medium">
                    $
                    {orderSummary.products.length === 0
                      ? '0.00'
                      : orderSummary.tax?.toFixed(2) || '10.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <div className="text-right">
                    <div className="text-gray-800 font-medium">
                      {orderSummary.shipping?.method || 'Standard Shipping'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {orderSummary.shipping?.estimate || '3-5 busy days'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t-2 border-red-200 mt-6 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold">
                    $
                    {orderSummary.products.length === 0
                      ? '0.00'
                      : orderSummary.total?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                  <span className="text-sm font-semibold text-red-800">
                    Secure Payment
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => {
                        setSelected(method.id);
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethod: method.name,
                        }));
                        toast.success(
                          `Payment method selected: ${method.name}`
                        );
                      }}
                      className={`cursor-pointer bg-white p-3 border rounded-md shadow-sm w-15 h-12 flex items-center justify-center transition-all duration-200
        ${
          selected === method.id
            ? 'border-red-600 ring-2 ring-red-500'
            : 'border-gray-200 hover:border-red-400'
        }`}
                    >
                      <img
                        src={method.logo}
                        alt={method.name}
                        className="max-h-6 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={handleAddInvoice}
                className="w-full cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-lg text-center font-semibold uppercase tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
