import { useState } from 'react';
import Logo from '../../../public/logo.svg';
import { FiMenu, FiX, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { FiFileText, FiInfo, FiHelpCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  //navigate
  const navigate = useNavigate();
  const handleRegisOnclick = () => {
    navigate('/register');
  };

  const handleLoginOnclick = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  }

  const handleCartClick = () => {
      toast.error('Please login to access your cart');
      return;
  }


  // bagian hamburger
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    
    <nav className="sticky top-0 z-50 px-6 py-3 mt-3 border-b border-gray-300 bg-white pb-7  ">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-between">
        {/* logo icon */}
        <div className="w-32 md:w-40 md:ml-0">
          <img src={Logo} onClick={handleLogoClick} alt="Logo" className="w-full cursor-pointer" />
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
        <div className="hidden md:flex items-center ml-1 mr-3 ">
          <div className="flex space-x-4 font-[poppins] font-regular text-base md:text-sm md:ml-5 mr-8 relative">
            <div className="group relative">
              <a href="#" className="hover:underline">
                News
              </a>
              <div
                className="absolute left-0 top-full mt-2 w-40 p-2 text-sm bg-white border rounded shadow-lg 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10"
              >
                Latest updates and articles.
              </div>
            </div>

            <div className="group relative">
              <a href="#" className="hover:underline">
                About
              </a>
              <div className="absolute left-0 top-full mt-2 w-40 p-2 text-sm bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10">
                Learn more about us.
              </div>
            </div>

            <div className="group relative">
              <a href="#" className="hover:underline">
                Help
              </a>
              <div className="absolute left-0 top-full mt-2 w-40 p-2 text-sm bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10">
                Get assistance here.
              </div>
            </div>
          </div>

          <FiShoppingCart onClick={handleCartClick} className="text-xl cursor-pointer" />
        </div>
        {/* login and sign up */}
        <div className="hidden md:flex items-center space-x-4 ml-5 mr-10 :space-x-1 ">
          <button
            onClick={handleLoginOnclick}
            className="font-[poppins] font-semibold px-4 py-1 border border-black rounded-full cursor-pointer hover:bg-gray-800 hover:text-white transition duration-300"
          >
            Login
          </button>
          <button
            onClick={handleRegisOnclick}
            className="font-[poppins] font-semibold px-4 py-1 bg-black text-white cursor-pointer rounded-full hover:bg-gray-800 "
          >
            Regis
          </button>
        </div>

        {/* hamburger dan cart */}
        <div className="md:hidden justify-end flex items-center space-x-4">
          <FiShoppingCart onClick={handleCartClick}  className="text-xl cursor-pointer" />
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

     {/* mobile menu */}
{isOpen && (
  <div className="md:hidden mt-5 space-y-5 px-4">
    {/* Search */}
    <div className="relative w-full">
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
      />
    </div>

    {/* Menu Links */}
    <div className="flex flex-col space-y-3 font-[poppins] text-base text-gray-700">
      <a href="#" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors">
        <FiFileText className="text-[18px]" /> News
      </a>
      <a href="#" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors">
        <FiInfo className="text-[18px]" /> About
      </a>
      <a href="#" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors">
        <FiHelpCircle className="text-[18px]" /> Help
      </a>

      {/* Buttons */}
      <button
        onClick={handleLoginOnclick}
        className="w-full border border-black rounded-full py-2 font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors"
      >
        Login
      </button>
      <button
        onClick={handleRegisOnclick}
        className="w-full bg-black text-white rounded-full py-2 font-medium hover:opacity-90 active:opacity-80 transition-opacity"
      >
        Sign Up
      </button>
    </div>
  </div>

      )}
    </nav>
    </>
  );
};

export default Navbar;
