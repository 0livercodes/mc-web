import { useState } from 'react';
import SearchBar from '../navigation/SearchBar';
import Button from '../common/Button';


/**
 * Main site header with navigation, search, and user actions
 */
const Header = ({
  logo = 'MC Store',
  cartItemCount = 0,
  isAuthenticated = false,
  user = null,
  onSearch,
  onCartClick,
  onAuthClick,
  onUserMenuClick,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (query) => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (onUserMenuClick) {
      onUserMenuClick(!showUserMenu);
    }
  };

  // Sample search suggestions for demo
  const searchSuggestions = [
    { id: 1, text: 'iPhone 15', category: 'Electronics', type: 'popular' },
    { id: 2, text: 'Running Shoes', category: 'Sports', type: 'recent' },
    { id: 3, text: 'Laptop', category: 'Electronics', type: 'popular' }
  ];

  return (
    <header className={`sticky top-0 z-40 bg-white ${className}`}>
      <div className="w-full flex items-center justify-center gap-8 px-4 min-h-16">
        {/* Logo */}
        <div className="flex items-center justify-center shrink-0">
          <img src="/src/assets/mc.svg" alt="MC Logo" className="w-12 h-12 block mx-auto" />
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 flex justify-center" aria-label="Main navigation">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            <li><a href="#" className="text-gray-500 font-medium hover:text-gray-900 transition-colors px-2 py-1">Home</a></li>
            <li><a href="#" className="text-gray-500 font-medium hover:text-gray-900 transition-colors px-2 py-1">Products</a></li>
            <li><a href="#" className="text-gray-500 font-medium hover:text-gray-900 transition-colors px-2 py-1">Categories</a></li>
            <li><a href="#" className="text-gray-500 font-medium hover:text-gray-900 transition-colors px-2 py-1">Deals</a></li>
            <li><a href="#" className="text-gray-500 font-medium hover:text-gray-900 transition-colors px-2 py-1">About</a></li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="max-w-md w-full">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            suggestions={searchQuery ? searchSuggestions : []}
            showSuggestions={searchQuery.length > 0}
            placeholder="Search products..."
          />
        </div>

        {/* User Actions */}

        <div className="flex items-center gap-4 shrink-0">
          {/* Cart Button */}
          <button 
            className="relative bg-transparent border-none p-2 cursor-pointer rounded-md hover:bg-gray-100 transition-colors"
            onClick={handleCartClick}
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            <span className="text-xl">🛒</span>
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-1 rounded-full min-w-[1.25rem] h-[1.25rem] flex items-center justify-center translate-x-1/4 -translate-y-1/4">{cartItemCount}</span>
            )}
          </button>

          {/* User Account */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                onClick={toggleUserMenu}
                aria-label="User menu"
                aria-expanded={showUserMenu}
              >
                <span className="text-lg">{user?.avatar || '👤'}</span>
                <span className="font-medium">{user?.name || 'Account'}</span>
                <span className="text-xs">▼</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <ul className="flex flex-col">
                    <li><a href="#" className="px-4 py-2 hover:bg-gray-100 transition-colors">Profile</a></li>
                    <li><a href="#" className="px-4 py-2 hover:bg-gray-100 transition-colors">Orders</a></li>
                    <li><a href="#" className="px-4 py-2 hover:bg-gray-100 transition-colors">Wishlist</a></li>
                    <li><a href="#" className="px-4 py-2 hover:bg-gray-100 transition-colors">Settings</a></li>
                    <li className="border-t my-1"></li>
                    <li><a href="#" className="px-4 py-2 hover:bg-gray-100 transition-colors">Sign Out</a></li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Button
                variant="ghost"
                size="small"
                onClick={onAuthClick}
                className="px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="ml-4 flex flex-col gap-1 items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors" aria-label="Toggle mobile menu">
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;