import { useState } from 'react';
import './Rating.css';

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

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= displayValue;
    const isHalfFilled = starValue - 0.5 === displayValue;
    
    return (
      <button
        key={index}
        type="button"
        className={`rating__star rating__star--${size} ${
          isFilled ? 'rating__star--filled' : ''
        } ${isHalfFilled ? 'rating__star--half' : ''} ${
          readOnly ? 'rating__star--readonly' : ''
        }`}
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
    <div className={`rating ${className}`} role="img" aria-label={`Rating: ${value} out of ${maxRating} stars`}>
      <div className="rating__stars">
        {stars}
      </div>
      {showValue && (
        <span className="rating__value">
          {value.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};

export default Rating;