import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, Mail, CreditCard, MapPin, Phone, User, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';

const Confirmation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const timer = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % 4);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const orderSteps = [
        { icon: CheckCircle, label: "Order Confirmed", active: true },
        { icon: Package, label: "Processing", active: false },
        { icon: Package, label: "Shipped", active: false },
        { icon: CheckCircle, label: "Delivered", active: false }
    ];


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
                                                className={`absolute top-[35%] left-1/2 h-0.5 z-0 transition-all duration-500 ${ index === 0
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
                    <button className="group bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transform hover:-translate-y-1">
                        <span className="flex items-center justify-center gap-2">
                            <Package className="w-5 h-5" />
                            Track Your Order
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                    <button className="group bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 transform hover:-translate-y-1">
                        <span className="flex items-center justify-center gap-2">
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
                            {[
                                { icon: Package, label: "Order Number", value: "#76453857", color: "text-red-600" },
                                { icon: Calendar, label: "Date", value: "14 May 2024", color: "text-green-600" },
                                { icon: CreditCard, label: "Payment Method", value: "Mastercard", color: "text-purple-600" },
                                { icon: User, label: "Name", value: "Flowbite Studios LLC", color: "text-indigo-600" },
                                { icon: MapPin, label: "Address", value: "Scott Street, San Francisco, California, USA", color: "text-red-600" },
                                { icon: Phone, label: "Phone", value: "+(123) 456 7890", color: "text-orange-600" },
                                { icon: Mail, label: "Email", value: "name@company.com", color: "text-teal-600" }
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
                            })}
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
                            support@company.com
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
