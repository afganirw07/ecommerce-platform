import { useState } from 'react';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiUser, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';



import Logo from '../../../public/logo.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/cart');
    }

    // logo
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <>
        <nav className="sticky top-0 z-50 px-10 py-3 mt-3 border-b border-gray-300 bg-white pb-7">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="w-32 md:w-40 md:ml-0 cursor-pointer" onClick={handleLogoClick}>
                    <img src={Logo} alt="Logo" className="w-full" />
                </div>

                {/* Search */}
                <div className="hidden md:flex flex-1 mx-10">
                    <div className="relative w-full">
                        <FiSearch className="absolute left-3 top-3 text-gray-800" />
                        <input
                            type="text"
                            placeholder="Search for brand, color, etc."
                            className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-black transition duration-300"
                        />
                    </div>
                </div>

                {/* News section */}
                <div className="hidden md:flex items-center ml-1 mr-3">
                    <div className="flex space-x-4 font-[poppins] font-regular text-base md:text-sm md:ml-5 mr-8 relative">
                        {['News', 'About', 'Help'].map((item) => (
                            <div key={item} className="group relative">
                                <a href="#" className="hover:underline">{item}</a>
                                <div className="absolute left-0 top-full mt-2 w-40 p-2 text-sm bg-white border rounded shadow-lg 
                                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10">
                                    {item === 'News' && 'Latest updates and articles.'}
                                    {item === 'About' && 'Learn more about us.'}
                                    {item === 'Help' && 'Get assistance here.'}
                                </div>
                            </div>
                        ))}
                    </div>

                    <FiShoppingCart onClick={handleCartClick} className="text-xl cursor-pointer" />
                </div>

                {/* Profile and Wishlist */}
                <div className="hidden md:flex items-center space-x-6 ml-5 mr-10">
                    <button className="text-xl cursor-pointer" title="Wishlist">
                        <FiHeart />
                    </button>

                    <button className="text-xl cursor-pointer" title="Login">
                        <FiUser />
                    </button>
                </div>

                {/* Hamburger */}
                <div className="md:hidden justify-end flex items-center space-x-4">
                    <button className="w-full flex justify-center py-2 text-xl">
                        <FiHeart />
                    </button>
                    <button onClick={handleCartClick} className="w-full flex justify-center py-2 text-xl">
                        <FiShoppingCart />
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-3 space-y-4">
                    <div className="relative w-full">
                        <FiSearch className="absolute left-4 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col space-y-2 font-[poppins] text-sm">
                        <a href="#">News</a>
                        <a href="#">About</a>
                        <a href="#">Help</a>
                        <a href="#">Profile</a>
                    </div>
                </div>
            )}
        </nav>
        
        </>
    );
};

export default Navbar;
