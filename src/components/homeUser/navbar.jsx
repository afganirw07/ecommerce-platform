import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiMenu,
    FiX,
    FiSearch,
    FiShoppingCart,
    FiUser,
    FiHeart,
    FiHome,
    FiInfo,
    FiHelpCircle
} from 'react-icons/fi';
import Logo from '../../../public/logo.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const suggestionsRef = useRef(null);

    // Debounce untuk mengurangi jumlah API calls
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

    // Fetch suggestions dari API
    const fetchSuggestions = async (query) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(query)}`);
            
            if (response.ok) {
                const products = await response.json();
                
                // Ekstrak suggestions dari products (name, title, category)
                const uniqueSuggestions = new Set();
                
                products.forEach(product => {
                    if (product.name && product.name.toLowerCase().includes(query.toLowerCase())) {
                        uniqueSuggestions.add(product.name);
                    }
                    if (product.title && product.title.toLowerCase().includes(query.toLowerCase())) {
                        uniqueSuggestions.add(product.title);
                    }
                    if (product.category && product.category.toLowerCase().includes(query.toLowerCase())) {
                        uniqueSuggestions.add(product.category);
                    }
                });

                const suggestionArray = Array.from(uniqueSuggestions).slice(0, 8); 
                setSuggestions(suggestionArray);
                setShowSuggestions(suggestionArray.length > 0);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
            setShowSuggestions(false);
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
                setSelectedIndex(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
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
        if (suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    // Handle click outside
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
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCartClick = () => {
        navigate('/cart');
    }

    const handleFavoritesClick = () => {
        navigate('/favorite');
    }

    const handleProfileClick = () => {
        navigate('/profile');
    }

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <>
            <nav className="sticky top-0 z-50 px-7 md:px-10 py-3 mt-3 border-b border-gray-300 bg-white pb-7">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="w-32 md:w-40 md:ml-0 cursor-pointer" onClick={handleLogoClick}>
                        <img src={Logo} alt="Logo" className="w-full" />
                    </div>

                    {/* Search - Desktop */}
                    <div className="hidden md:flex flex-1 mx-10 relative">
                        <form onSubmit={handleSearchSubmit} className="relative w-full">
                            <FiSearch className="absolute left-3 top-3 text-gray-800 z-10" />
                            <input
                                ref={searchRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={handleInputFocus}
                                placeholder="Search for brand, color, etc."
                                className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-black transition duration-300"
                                autoComplete="off"
                            />
                        </form>

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
                                                index === selectedIndex 
                                                    ? 'bg-blue-50 text-blue-700' 
                                                    : 'hover:bg-gray-50'
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

                        <FiShoppingCart onClick={handleCartClick} className="text-xl cursor-pointer" title='Cart' />
                    </div>

                    {/* Profile and Favorite */}
                    <div className="hidden md:flex items-center space-x-6 ml-5 mr-10">
                        <button onClick={handleFavoritesClick} className="text-xl cursor-pointer" title="Favorites">
                            <FiHeart />
                        </button>

                        <button onClick={handleProfileClick} className="text-xl cursor-pointer" title="Profile">
                            <FiUser />
                        </button>
                    </div>

                    {/* Hamburger */}
                    <div className="md:hidden justify-end flex items-center space-x-4">
                        <button onClick={handleFavoritesClick} className="w-full cursor-pointer flex justify-center py-2 text-xl">
                            <FiHeart />
                        </button>
                        <button onClick={handleCartClick} className="w-full flex cursor-pointer justify-center py-2 text-xl">
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
                        <div className="relative">
                            <form onSubmit={handleSearchSubmit} className="relative w-full">
                                <FiSearch className="absolute left-4 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onFocus={handleInputFocus}
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                                    autoComplete="off"
                                />
                            </form>

                            {/* Suggestions Dropdown - Mobile */}
                            {showSuggestions && (
                                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto z-50">
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
                                                    index === selectedIndex 
                                                        ? 'bg-blue-50 text-blue-700' 
                                                        : 'hover:bg-gray-50'
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

                        <div className="flex flex-col space-y-3 font-[poppins] text-base text-gray-700 px-2">
                            <a href="#" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors">
                                <FiHome className="text-lg" />
                                News
                            </a>
                            <a href="#" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors">
                                <FiInfo className="text-lg" />
                                About
                            </a>
                            <a href="#" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors">
                                <FiHelpCircle className="text-lg" />
                                Help
                            </a>
                            <a href="/profile" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors">
                                <FiUser className="text-lg" />
                                Profile
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;