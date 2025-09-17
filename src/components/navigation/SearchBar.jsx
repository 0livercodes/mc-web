import { useState, useRef, useEffect } from 'react';
// Tailwind CSS used for styling

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
    if (!showSuggestions || suggestions.length === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
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
      default:
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
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="w-full relative">
        <div className="flex items-center gap-2 w-full max-w-md bg-white rounded-lg shadow px-3 py-2">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 py-1"
            aria-label="Search"
            aria-expanded={showSuggestionsList}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            role="combobox"
          />
          <button
            type="submit"
            className="text-gray-500 hover:text-blue-600 transition-colors p-1"
            aria-label="Search"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full"></span>
            ) : (
              <svg
                className="w-5 h-5"
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
            className="absolute z-20 mt-1 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-auto max-h-60"
            role="listbox"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.id || index}
                className={`px-4 py-2 cursor-pointer flex items-center justify-between hover:bg-blue-50 ${index === activeSuggestion ? 'bg-blue-100 text-blue-700' : ''}`}
                role="option"
                aria-selected={index === activeSuggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{suggestion.text}</span>
                  {suggestion.category && (
                    <span className="text-xs text-gray-400">in {suggestion.category}</span>
                  )}
                </div>
                {suggestion.type === 'recent' && (
                  <span className="ml-2 text-xs">🕒</span>
                )}
                {suggestion.type === 'popular' && (
                  <span className="ml-2 text-xs">🔥</span>
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