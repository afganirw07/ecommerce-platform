import React from 'react';
import {
    User,
    KeyRound,
    ShoppingCart,
    Heart,
    Clock,
    LogOut,
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const getProfileData = () => {
    const profileData = localStorage.getItem('user');

    if (!profileData) return { firstName: '', lastName: '', email: '' };

    const parsedData = JSON.parse(profileData);
    const { firstName, lastName, email } = parsedData;

    return { firstName, lastName, email };
};

const generateRandomUsername = () => {
    const prefix = "sneakerhead";
    const randomNumber = Math.floor(Math.random() * 1_000_000_000);
    return `${prefix}${randomNumber}`;
};



const Profile = () => {
    const { firstName, lastName, email } = getProfileData();
    const navigate = useNavigate();

    
const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('chatMessages');
    navigate('/');
    toast.success('You have successfully logged out');
}

const handleFavoritesClick = () => {
    navigate('/favorite');
};
const handleCartClick = () => {
    navigate('/cart');
};

    return (
        <div className=" bg-gray-50">
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
            <div className="flex flex-col lg:flex-row">

                {/* Sidebar */}
                <aside className="w-full lg:w-80 bg-white">
                    <div className="p-6 font-[poppins] text-gray-900 border-gray-200">
                        <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
                            {firstName}<br />{lastName}
                        </h1>
                    </div>

                    <nav className="px-6 pb-6 space-y-6">
                        {[
                            {
                                icon: <User className="mt-1 mr-4 h-5 w-5 text-gray-600" />,
                                title: 'Profile',
                                desc: 'Shipping, Email, Password, Shoe Size',
                                onClick: () => { } 
                            },
                            {
                                icon: <ShoppingCart className="mt-1 mr-4 h-6 w-6 text-gray-600" />,
                                title: 'Cart',
                                desc: 'View and manage products you intend to purchase',
                                onClick: () => {handleCartClick() }
                            },
                            {
                                icon: <Heart className="mt-1 mr-4 h-5 w-5 text-gray-600" />,
                                title: 'Favorites',
                                desc: "Items and lists you've saved",
                                onClick: () => { handleFavoritesClick() }
                            },
                            {
                                icon: <Clock className="mt-1 mr-4 h-6 w-6 text-gray-600" />,
                                title: 'Shopping History',
                                desc: 'View a detailed history of all your past purchases',
                                onClick: () => { }
                            },
                            {
                                icon: <KeyRound className="mt-1 mr-4 h-6 w-6 text-gray-600" />,
                                title: 'Security',
                                desc: 'Manage your password, login activity, and account safety',
                                onClick: () => { }
                            },
                            {
                                icon: <LogOut className="mt-1 mr-4 h-5 w-5 text-gray-600" />,
                                title: 'Log Out',
                                desc: '',
                                onClick: logOut 
                            },
                        ].map(({ icon, title, desc, onClick }, i) => (
                            <div
                                key={i}
                                onClick={onClick} 
                                className="flex items-start cursor-pointer hover:opacity-75"
                            >
                                {icon}
                                <div>
                                    <div className="text-base font-semibold text-gray-900">{title}</div>
                                    <div className="text-sm text-gray-600">{desc}</div>
                                </div>
                            </div>
                        ))}

                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-white">
                    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-8">
                        {/* Header */}
                        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

                      
                        <Section
                            title="Personal Information"
                            buttonLabel="Edit"
                            content={
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <InfoItem label="Name" value={`${firstName} ${lastName}`} />
                                    <InfoItem label="Email Address" value={email} />
                                    <InfoItem label="Username" value={generateRandomUsername()} />
                                </div>
                            }
                        />

                        
                        <Section
                            title="Shipping Addresses"
                            buttonLabel="Add"
                            content={
                                <p className="text-base text-gray-700">
                                    Jl. Maliki 1 No. 1, Depok, Jawa Barat, Indonesia
                                </p>
                            }
                        />

                       
                        <Section
                            title="Size Preferences"
                            buttonLabel="Edit"
                            content={
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <SizeItem label="My Shoe Sizes" />
                                    <SizeItem label="My Apparel Sizes" />
                                </div>
                            }
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

const Section = ({ title, buttonLabel, content }) => (
    <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                {buttonLabel}
            </button>
        </div>
        <div className="border-b border-gray-200 mb-8"></div>
        {content}
    </section>
);

const InfoItem = ({ label, value }) => (
    <div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">{label}</h3>
        <p className="text-base text-gray-900">{value}</p>
    </div>
);

const SizeItem = ({ label }) => (
    <div>
        <h3 className="text-base font-semibold text-gray-900 mb-4">{label}</h3>
        <button className="text-base text-red-500 hover:text-teal-700 font-medium underline decoration-2 underline-offset-2">
            Set Sizes
        </button>
    </div>
);

export default Profile;
