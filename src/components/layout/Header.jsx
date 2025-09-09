import { useState } from 'react';
import SearchBar from '../navigation/SearchBar';
import Button from '../common/Button';
import './Header.css';

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
    <header className={`header ${className}`}>
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">
          <h1 className="header__brand">{logo}</h1>
        </div>

        {/* Main Navigation */}
        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            <li><a href="#" className="header__nav-link">Home</a></li>
            <li><a href="#" className="header__nav-link">Products</a></li>
            <li><a href="#" className="header__nav-link">Categories</a></li>
            <li><a href="#" className="header__nav-link">Deals</a></li>
            <li><a href="#" className="header__nav-link">About</a></li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="header__search">
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
        <div className="header__actions">
          {/* Cart Button */}
          <button 
            className="header__cart-btn"
            onClick={handleCartClick}
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            <span className="header__cart-icon">🛒</span>
            {cartItemCount > 0 && (
              <span className="header__cart-badge">{cartItemCount}</span>
            )}
          </button>

          {/* User Account */}
          {isAuthenticated ? (
            <div className="header__user-menu">
              <button
                className="header__user-btn"
                onClick={toggleUserMenu}
                aria-label="User menu"
                aria-expanded={showUserMenu}
              >
                <span className="header__user-avatar">
                  {user?.avatar || '👤'}
                </span>
                <span className="header__user-name">
                  {user?.name || 'Account'}
                </span>
                <span className="header__user-arrow">▼</span>
              </button>

              {showUserMenu && (
                <div className="header__user-dropdown">
                  <ul className="header__user-menu-list">
                    <li><a href="#" className="header__user-menu-link">Profile</a></li>
                    <li><a href="#" className="header__user-menu-link">Orders</a></li>
                    <li><a href="#" className="header__user-menu-link">Wishlist</a></li>
                    <li><a href="#" className="header__user-menu-link">Settings</a></li>
                    <li className="header__user-menu-separator"></li>
                    <li><a href="#" className="header__user-menu-link">Sign Out</a></li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="header__auth">
              <Button
                variant="ghost"
                size="small"
                onClick={onAuthClick}
                className="header__auth-btn"
              >
                Sign In
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="header__mobile-toggle" aria-label="Toggle mobile menu">
          <span className="header__hamburger"></span>
          <span className="header__hamburger"></span>
          <span className="header__hamburger"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;