import { useState, useEffect, useRef } from 'react';
import Logo from '../../../public/logo.svg';
import { FiMenu, FiX, FiSearch, FiShoppingCart, FiFileText, FiInfo, FiHelpCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Handle navigation
  const handleRegisOnclick = () => navigate('/register');
  const handleLoginOnclick = () => navigate('/login');
  const handleLogoClick = () => navigate('/');
  const handleCartClick = () => {
    toast.error('Please login to access your cart');
  };

  // Debounce search query to reduce API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        fetchSuggestions(searchQuery.trim());
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Fetch suggestions from your API
  const fetchSuggestions = async (query) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        const products = Array.isArray(data) ? data : data.products || [];
        const uniqueSuggestions = new Set();

        // Extract suggestions from product name, title, or category
        products.forEach((product) => {
          if (product.name?.toLowerCase().includes(query.toLowerCase())) {
            uniqueSuggestions.add(product.name);
          }
          if (product.title?.toLowerCase().includes(query.toLowerCase())) {
            uniqueSuggestions.add(product.title);
          }
          if (product.category?.toLowerCase().includes(query.toLowerCase())) {
            uniqueSuggestions.add(product.category);
          }
        });

        const suggestionArray = Array.from(uniqueSuggestions).slice(0, 8);
        setSuggestions(suggestionArray);
        setShowSuggestions(suggestionArray.length > 0);
      } else {
        throw new Error('Failed to fetch suggestions');
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
      toast.error('Failed to load suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearchSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (suggestions.length > 0 && searchQuery.trim().length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 px-6 py-3 mt-3 border-b border-gray-300 bg-white pb-7">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="w-32 md:w-40 md:ml-0">
            <img src={Logo} onClick={handleLogoClick} alt="Logo" className="w-full cursor-pointer" />
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 mx-10 relative">
            <div className="relative w-full" ref={searchRef}>
              <FiSearch className="absolute left-3 top-3 text-gray-800 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                placeholder="Search for brand, color, etc."
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-black transition duration-300"
                autoComplete="off"
              />
              {/* Suggestions Dropdown - Desktop */}
              {showSuggestions && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50"
                >
                  {isLoading ? (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                        Searching...
                      </div>
                    </div>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                          index === selectedIndex ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center">
                          <FiSearch className="text-gray-400 mr-3 text-sm" />
                          <span className="text-sm">{suggestion}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* News Section */}
          <div className="hidden md:flex items-center ml-1 mr-3">
            <div className="flex space-x-4 font-[poppins] font-regular text-base md:text-sm md:ml-5 mr-8 relative">
              {['News', 'About', 'Help'].map((item) => (
                <div key={item} className="group relative">
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                  <div className="absolute left-0 top-full mt-2 w-40 p-2 text-sm bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-10">
                    {item === 'News' && 'Latest updates and articles.'}
                    {item === 'About' && 'Learn more about us.'}
                    {item === 'Help' && 'Get assistance here.'}
                  </div>
                </div>
              ))}
            </div>
            <FiShoppingCart onClick={handleCartClick} className="text-xl cursor-pointer" />
          </div>

          {/* Login and Sign Up */}
          <div className="hidden md:flex items-center space-x-4 ml-5 mr-10">
            <button
              onClick={handleLoginOnclick}
              className="font-[poppins] font-semibold px-4 py-1 border border-black rounded-full cursor-pointer hover:bg-gray-800 hover:text-white transition duration-300"
            >
              Login
            </button>
            <button
              onClick={handleRegisOnclick}
              className="font-[poppins] font-semibold px-4 py-1 bg-black text-white cursor-pointer rounded-full hover:bg-gray-800"
            >
              Regis
            </button>
          </div>

          {/* Hamburger and Cart */}
          <div className="md:hidden justify-end flex items-center space-x-4">
            <FiShoppingCart onClick={handleCartClick} className="text-xl cursor-pointer" />
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-5 space-y-5 px-4">
            {/* Search - Mobile */}
            <div className="relative w-full" ref={searchRef}>
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                autoComplete="off"
              />
              {/* Suggestions Dropdown - Mobile */}
              {showSuggestions && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto z-50"
                >
                  {isLoading ? (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr- حاضي2"></div>
                        Searching...
                      </div>
                    </div>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`px-4 py-3 cursor-pointer transition-colors duration Same as before150 ${
                          index === selectedIndex ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center">
                          <FiSearch className="text-gray-400 mr-3 text-sm" />
                          <span className="text-sm">{suggestion}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Menu Links */}
            <div className="flex flex-col space-y-3 font-[poppins] text-base text-gray-700">
              <a
                href="#"
                className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <FiFileText className="text-[18px]" /> News
              </a>
              <a
                href="#"
                className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <FiInfo className="text-[18px]" /> About
              </a>
              <a
                href="#"
                className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
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