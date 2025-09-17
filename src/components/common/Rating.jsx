import { useState } from 'react';
// Tailwind CSS used for styling

/**
 * Star Rating component for product reviews
 * Supports read-only and interactive modes
 */
const Rating = ({
  value = 0,
  maxRating = 5,
  size = 'medium',
  readOnly = false,
  showValue = false,
  onChange,
  className = ''
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const displayValue = hoverValue || value;

  const handleClick = (rating) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating) => {
    if (!readOnly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= displayValue;
    return (
      <button
        key={index}
        type="button"
        className={`p-0 m-0 bg-transparent border-none ${sizeClasses[size] || sizeClasses.medium} ${isFilled ? 'text-yellow-400' : 'text-gray-300'} ${readOnly ? 'pointer-events-none' : ''}`}
        onClick={() => handleClick(starValue)}
        onMouseEnter={() => handleMouseEnter(starValue)}
        onMouseLeave={handleMouseLeave}
        disabled={readOnly}
        aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </button>
    );
  });

  return (
    <div className={`flex items-center gap-2 ${className}`} role="img" aria-label={`Rating: ${value} out of ${maxRating} stars`}>
      <div className="flex gap-1">
        {stars}
      </div>
      {showValue && (
        <span className="text-xs text-gray-500">
          {value.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};

export default Rating;

