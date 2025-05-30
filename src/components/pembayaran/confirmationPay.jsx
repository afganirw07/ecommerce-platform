import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Mail, CreditCard, MapPin, Phone, User, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';
import { deleteInvoice, getInvoice } from '../../service/invoice';

const Confirmation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [invoiceData, setInvoiceData] = useState(null);

    useEffect(() => {
        setIsVisible(true);
        const timer = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % 4);
        }, 2000);

        const fetchInvoice = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const currentUserId = user?.id || user?._id;
                if (!currentUserId) return;

                const data = await getInvoice(currentUserId);
                setInvoiceData(data[0]); // asumsi data adalah array, ambil yang pertama
            } catch (error) {
                console.error("Failed to get invoice:", error);
            }
        };

        fetchInvoice();

        return () => clearInterval(timer);
    }, []);

    // Updated function to generate PDF invoice
    const handlePrintInvoice = () => {
        if (!invoiceData) {
            alert('Invoice data not loaded yet. Please wait...');
            return;
        }

        // Create PDF content
        const generatePDF = () => {
            const invoiceHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Invoice - ${invoiceData.user}</title>
                    <meta charset="utf-8">
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            background: white;
                            padding: 40px;
                        }
                        .invoice-container {
                            max-width: 800px;
                            margin: 0 auto;
                            background: white;
                            border-radius: 10px;
                            overflow: hidden;
                            box-shadow: 0 0 20px rgba(0,0,0,0.1);
                        }
                        .invoice-header {
                            background: linear-gradient(135deg, #e53e3e, #f56565);
                            color: white;
                            padding: 30px;
                            text-align: center;
                        }
                        .invoice-header h1 {
                            font-size: 32px;
                            margin-bottom: 10px;
                            font-weight: 700;
                        }
                        .invoice-header p {
                            font-size: 16px;
                            opacity: 0.9;
                        }
                        .invoice-content {
                            padding: 40px;
                        }
                        .invoice-info {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 30px;
                            margin-bottom: 40px;
                        }
                        .info-section h3 {
                            color: #e53e3e;
                            font-size: 18px;
                            margin-bottom: 15px;
                            border-bottom: 2px solid #e53e3e;
                            padding-bottom: 5px;
                        }
                        .info-item {
                            display: flex;
                            justify-content: space-between;
                            padding: 8px 0;
                            border-bottom: 1px solid #eee;
                        }
                        .info-item:last-child {
                            border-bottom: none;
                        }
                        .info-label {
                            font-weight: 600;
                            color: #666;
                        }
                        .info-value {
                            color: #333;
                            font-weight: 500;
                        }
                        .order-summary {
                            background: #f8f9fa;
                            padding: 25px;
                            border-radius: 8px;
                            margin-top: 30px;
                        }
                        .order-summary h3 {
                            color: #e53e3e;
                            margin-bottom: 20px;
                            font-size: 20px;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 40px;
                            padding-top: 20px;
                            border-top: 2px solid #eee;
                            color: #666;
                        }
                        .company-info {
                            background: #f8f9fa;
                            padding: 20px;
                            text-align: center;
                            border-top: 1px solid #eee;
                        }
                        @media print {
                            body { padding: 0; }
                            .invoice-container { box-shadow: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="invoice-container">
                        <div class="invoice-header">
                            <h1>INVOICE</h1>
                            <p>ReKicks - Style in Every Step</p>
                            <p>Generated on ${new Date().toLocaleDateString('id-ID', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</p>
                        </div>
                        
                        <div class="invoice-content">
                            <div class="invoice-info">
                                <div class="info-section">
                                    <h3>Order Information</h3>
                                    <div class="info-item">
                                        <span class="info-label">Order Number:</span>
                                        <span class="info-value">${invoiceData._id}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Order Date:</span>
                                        <span class="info-value">${new Date(invoiceData.createdAt).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Payment Method:</span>
                                        <span class="info-value">${invoiceData.paymentMethod || 'Not specified'}</span>
                                    </div>
                                </div>
                                
                                <div class="info-section">
                                    <h3>Customer Information</h3>
                                    <div class="info-item">
                                        <span class="info-label">Name:</span>
                                        <span class="info-value">${invoiceData.firstName} ${invoiceData.lastName}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Email:</span>
                                        <span class="info-value">${invoiceData.email}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Phone:</span>
                                        <span class="info-value">${invoiceData.phone}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="info-section">
                                <h3>Shipping Address</h3>
                                <div class="info-item">
                                    <span class="info-label">Address:</span>
                                    <span class="info-value">${invoiceData.streetAddress}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Province:</span>
                                    <span class="info-value">${invoiceData.province}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Country:</span>
                                    <span class="info-value">${invoiceData.country}</span>
                                </div>
                            </div>
                            
                            ${invoiceData.items ? `
                                <div class="order-summary">
                                    <h3>Order Items</h3>
                                    ${invoiceData.items.map(item => `
                                        <div class="info-item">
                                            <span class="info-label">${item.productId.title || 'Product'}</span>
                                            <span class="info-value">Qty: ${item.quantity || 1} - $${item.unitPrice || 0}</span>
                                        </div>
                                    `).join('')}
                                    <div class="info-item" style="border-top: 2px solid #e53e3e; margin-top: 15px; padding-top: 15px; font-weight: bold;">
                                        <span class="info-label">Total:</span>
                                        <span class="info-value">$${invoiceData.subtotalProduct || 0}</span>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="company-info">
                            <p><strong>ReKicks</strong></p>
                            <p>Email: ReKicks@gmail.com | Phone: +1 (555) 123-4567</p>
                            <p>Thank you for your business!</p>
                        </div>
                    </div>
                    
                    <script>
                        window.onload = function() {
                            window.print();
                            setTimeout(() => window.close(), 1000);
                        }
                    </script>
                </body>
                </html>
            `;
            
            const printWindow = window.open('', '_blank');
            printWindow.document.write(invoiceHTML);
            printWindow.document.close();
        };

        generatePDF();
    };

    const orderSteps = [
        { icon: CheckCircle, label: "Order Confirmed", active: true },
        { icon: Package, label: "Processing", active: false },
        { icon: Package, label: "Shipped", active: false },
        { icon: CheckCircle, label: "Delivered", active: false }
    ];

    // handle delete invoice
    const navigate = useNavigate();
    const handleDeleteInvoice = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const currentUserId = user?.id || user?._id;
        try {
            await deleteInvoice(currentUserId);
            navigate('/');
        } catch (error) {
            console.error("Error deleting invoice:", error);
        }
    }

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce delay-300"></div>
                <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-rose-300 rounded-full opacity-20 animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-12">
                {/* Success Animation */}
                <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="relative inline-block mb-6">
                        <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg shadow-red-200 animate-pulse">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-rose-600 rounded-full opacity-20 animate-ping"></div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                        Order Confirmed!
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Thank you for your purchase! Your order is being processed and you'll receive updates via email.
                    </p>
                </div>

                {/* Order Progress */}
                <div className={`mb-12 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Order Status</h3>
                        <div className="flex justify-between items-center">
                            {orderSteps.map((step, index) => {
                                const Icon = step.icon;
                                const isLast = index === orderSteps.length - 1;

                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center relative">
                                        {/* Garis sambungan di belakang bulatan, kecuali step terakhir */}
                                        {!isLast && (
                                            <div
                                                className={`absolute top-[35%] left-1/2 h-0.5 z-0 transition-all duration-500 ${index === 0
                                                        ? 'bg-gradient-to-r from-red-500 to-rose-600'
                                                        : 'bg-gray-200'
                                                    }`}
                                                style={{ width: '100%', transform: 'translateY(-50%)' }}
                                            />
                                        )}

                                        {/* Lingkaran step */}
                                        <div
                                            className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${step.active
                                                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
                                                    : 'bg-gray-200 text-gray-400'
                                                }`}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        {/* Label */}
                                        <span
                                            className={`text-xs mt-2 font-medium text-center ${step.active ? 'text-red-600' : 'text-gray-400'
                                                }`}
                                        >
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <button onClick={handlePrintInvoice} className="group cursor-pointer bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transform hover:-translate-y-1">
                        <span className="flex items-center justify-center gap-2">
                            <Package className="w-5 h-5" />
                            Print Invoice
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                    <button onClick={handleDeleteInvoice} className="group bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 transform hover:-translate-y-1">
                        <span className="flex cursor-pointer items-center justify-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Continue Shopping
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>

                {/* Order Details Card */}
                <div className={`max-w-7xl mx-auto transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                        <div className="bg-gradient-to-r from-red-500 to-rose-600 p-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Package className="w-6 h-6" />
                                Order Details
                            </h2>
                        </div>

                        <div className="p-6 space-y-4">
                            {invoiceData ? [
                                { icon: Package, label: "Order Number", value: invoiceData._id, color: "text-red-600" },
                                { icon: Calendar, label: "Date", value: new Date(invoiceData.createdAt).toLocaleDateString(), color: "text-green-600" },
                                { icon: CreditCard, label: "Payment Method", value: invoiceData.paymentMethod || "-", color: "text-purple-600" },
                                { icon: User, label: "Name", value: `${invoiceData.firstName} ${invoiceData.lastName}`, color: "text-indigo-600" },
                                { icon: MapPin, label: "Address", value: `${invoiceData.streetAddress}, ${invoiceData.province}, ${invoiceData.country}`, color: "text-red-600" },
                                { icon: Phone, label: "Phone", value: invoiceData.phone, color: "text-orange-600" },
                                { icon: Mail, label: "Email", value: invoiceData.email, color: "text-teal-600" }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center ${item.color}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-gray-600 font-medium">{item.label}</span>
                                        </div>
                                        <span className="text-gray-800 font-semibold text-right max-w-xs">{item.value}</span>
                                    </div>
                                );
                            })
                            : (
                                <p className="text-center py-6 text-gray-400">Loading invoice data...</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Support Section */}
                <div className={`text-center mt-12 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 max-w-md mx-auto">
                        <Mail className="w-8 h-8 text-red-600 mx-auto mb-3" />
                        <p className="text-gray-600 mb-3">Need help with your order?</p>
                        <a
                            href="mailto:support@company.com"
                            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors duration-200 group"
                        >
                            ReKicks@gmail.com
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;