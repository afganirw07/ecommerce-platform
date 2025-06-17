import React, { useState } from 'react';
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
import { updateUser } from '../../service/authAPI';

const getProfileData = () => {
    const profileData = localStorage.getItem('user');
    if (!profileData) return { firstName: '', lastName: '', email: '' };
    const parsedData = JSON.parse(profileData);
    const { firstName, lastName, email } = parsedData;
    return { firstName, lastName, email };
};

const generateRandomUsername = () => {
    const prefix = "rekickshead";
    const randomNumber = Math.floor(Math.random() * 1_000_000_000);
    return `${prefix}${randomNumber}`;
};

const Profile = () => {
    const navigate = useNavigate();
    const { firstName, lastName, email } = getProfileData();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ firstName, lastName, email });

    const logOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('chatMessages');
        navigate('/');
        toast.success('You have successfully logged out');
    };

    const handleFavoritesClick = () => navigate('/favorite');
    const handleCartClick = () => navigate('/cart');
    const handleHistoryClick = () => navigate('/history');

    const handleEditProfile = () => {
        setFormData({ firstName, lastName, email });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

const handleSave = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.id;

    if (!userId) {
      toast.error("User ID not found");
      return;
    }

    const updatedUser = await updateUser(userId, formData);

   
    localStorage.setItem("user", JSON.stringify(updatedUser));


    setFormData(updatedUser);

  
    toast.success("Profile updated successfully");

  
    setShowModal(false);

    setTimeout(() => {
      window.location.reload();
    }, 1500); 

  } catch (err) {
    console.error("Update failed:", err);
    toast.error("Failed to update profile");
  }
};



    return (
        <div className="bg-gray-50">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                <aside className="w-full lg:w-80 bg-white">
                    <div className="p-6 font-[poppins] text-gray-900 border-gray-200">
                        <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
                            {firstName} {lastName}
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
                                onClick: handleCartClick
                            },
                            {
                                icon: <Heart className="mt-1 mr-4 h-5 w-5 text-gray-600" />,
                                title: 'Favorites',
                                desc: "Items and lists you've saved",
                                onClick: handleFavoritesClick
                            },
                            {
                                icon: <Clock className="mt-1 mr-4 h-6 w-6 text-gray-600" />,
                                title: 'Shopping History',
                                desc: 'View a detailed history of all your past purchases',
                                onClick: handleHistoryClick
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
                            <div key={i} onClick={onClick} className="flex items-start cursor-pointer hover:opacity-75">
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
                        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>

                        <Section
                            title="Personal Information"
                            buttonLabel="Edit"
                            onButtonClick={handleEditProfile}
                            content={
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                                    <InfoItem label="Name" value={`${firstName} ${lastName}`} />
                                    <InfoItem label="Email Address" value={email} />
                                    <InfoItem label="Id Account" value={generateRandomUsername()} />
                                </div>
                            }
                        />

                        <Section
                            title="Shipping Addresses"
                            buttonLabel="Edit"
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

            {/* modals */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                >
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-600 font-medium">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 font-medium">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-600 font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-8 space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 bg-gray-100 cursor-pointer rounded-lg hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-5 py-2 bg-red-500 text-white cursor-pointer rounded-lg hover:bg-red-700 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

const Section = ({ title, buttonLabel, content, onButtonClick }) => (
    <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
                onClick={onButtonClick}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
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
        <button className="text-base text-red-500 hover:text-red-700 font-medium underline decoration-2 underline-offset-2">
            Set Sizes
        </button>
    </div>
);

export default Profile;
