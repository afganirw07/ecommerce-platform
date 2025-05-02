import { useState } from 'react';
import Logo from '../../../public/logo.svg';
import { FiMenu, FiX, FiSearch, FiShoppingCart } from 'react-icons/fi';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="px-6 py-3 mt-3 border-b border-gray-300 bg-white pb-7  ">
            <div className="flex items-center justify-between">
                {/* logo icon */}
                <div className="w-32 md:w-40 md:ml-0">
                    <img src={Logo} alt="Logo" className="w-full" />
                </div>


                {/* search */}
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

                {/*news */}
                <div className="hidden md:flex items-center ml-1 mr-3">
                    <div className="flex space-x-4 font-[poppins] font-regular text-5sm md:ml-5 mr-8 relative">
                        <div className="group relative">
                            <a href="#" className="hover:underline">News</a>
                            <div className="absolute left-0 top-full mt-2 w-40 p-2 text-sm bg-white border rounded shadow-lg 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10">
                                Latest updates and articles.
                            </div>

                        </div>

                        <div className="group relative">
                            <a href="#" className="hover:underline">About</a>
                            <div className="absolute left-0 top-full mt-2 w-40 p-2 text-sm bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10">
                                Learn more about us.
                            </div>
                        </div>

                        <div className="group relative">
                            <a href="#" className="hover:underline">Help</a>
                            <div className="absolute left-0 top-full mt-2 w-40 p-2 text-sm bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10">
                                Get assistance here.
                            </div>
                        </div>
                    </div>

                    <FiShoppingCart className="text-xl cursor-pointer" />
                </div>
                {/* login and sign up */}
                <div className="hidden md:flex items-center space-x-4 ml-5 mr-8">

                    <button className="font-[poppins] font-semibold px-4 py-1 border border-black rounded-full cursor-pointer hover:bg-gray-800 hover:text-white transition duration-300">
                        Login
                    </button>
                    <button className="font-[poppins] font-semibold px-4 py-1 bg-black text-white cursor-pointer rounded-full hover:bg-gray-800 ">
                        Sign Up
                    </button>

                </div>


                {/* hamburger dan cart */}
                <div className="md:hidden justify-end flex items-center space-x-4">
                    <FiShoppingCart className="text-xl cursor-pointer" />
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* mobile menu */}
            {isOpen && (
                <div className="md:hidden mt-4 space-y-4">
                    <div className="relative w-full">
                        <FiSearch className="absolute left-4 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col space-y-2  font-[poppins] text-sm">
                        <a href="#">News</a>
                        <a href="#">About</a>
                        <a href="#">Help</a>
                        <button className="w-full border border-black rounded-full py-2">
                            Login
                        </button>
                        <button className="w-full bg-black text-white rounded-full py-2">
                            Sign Up
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
