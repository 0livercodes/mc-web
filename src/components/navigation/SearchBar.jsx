import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

/**
 * Search Bar component with autocomplete functionality
 */
const SearchBar = ({
  placeholder = 'Search products...',
  value = '',
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  suggestions = [],
  showSuggestions = false,
  loading = false,
  className = '',
  size = 'medium'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setActiveSuggestion(-1);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
    inputRef.current?.blur();
  };

  const handleSuggestionClick = (suggestion) => {
    if (onChange) {
      onChange(suggestion.text);
    }
    if (onSubmit) {
      onSubmit(suggestion.text);
    }
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setIsFocused(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e) => {
    // Delay to allow suggestion clicks to register
    setTimeout(() => {
      setIsFocused(false);
      setActiveSuggestion(-1);
      if (onBlur) {
        onBlur(e);
      }
    }, 200);
  };

  // Scroll active suggestion into view
  useEffect(() => {
    if (activeSuggestion >= 0 && suggestionsRef.current) {
      const activeElement = suggestionsRef.current.children[activeSuggestion];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [activeSuggestion]);

  const showSuggestionsList = isFocused && showSuggestions && suggestions.length > 0;

  return (
    <div className={`search-bar search-bar--${size} ${className}`}>
      <form onSubmit={handleSubmit} className="search-bar__form">
        <div className="search-bar__input-container">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-bar__input"
            aria-label="Search"
            aria-expanded={showSuggestionsList}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            role="combobox"
          />
          
          <button
            type="submit"
            className="search-bar__submit"
            aria-label="Search"
            disabled={loading}
          >
            {loading ? (
              <span className="search-bar__spinner"></span>
            ) : (
              <svg
                className="search-bar__icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {showSuggestionsList && (
          <ul
            ref={suggestionsRef}
            className="search-bar__suggestions"
            role="listbox"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.id || index}
                className={`search-bar__suggestion ${
                  index === activeSuggestion ? 'search-bar__suggestion--active' : ''
                }`}
                role="option"
                aria-selected={index === activeSuggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="search-bar__suggestion-content">
                  <span className="search-bar__suggestion-text">
                    {suggestion.text}
                  </span>
                  {suggestion.category && (
                    <span className="search-bar__suggestion-category">
                      in {suggestion.category}
                    </span>
                  )}
                </div>
                {suggestion.type === 'recent' && (
                  <span className="search-bar__suggestion-icon">🕒</span>
                )}
                {suggestion.type === 'popular' && (
                  <span className="search-bar__suggestion-icon">🔥</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;