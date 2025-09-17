import Badge from '../common/Badge';
import { formatPrice } from '../../utils/formatters';

/**
 * Product Price component with discount handling and currency formatting
 */
const ProductPrice = ({
  price,
  originalPrice,
  currency = 'USD',
  showCurrency = true,
  size = 'medium',
  orientation = 'horizontal', // horizontal or vertical
  className = ''
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountAmount = hasDiscount ? originalPrice - price : 0;
  const discountPercentage = hasDiscount 
    ? Math.round((discountAmount / originalPrice) * 100) 
    : 0;

  // Use shared formatPrice utility

  // Tailwind utility classes for price display
  const sizeClasses = size === 'large' ? 'text-2xl' : size === 'small' ? 'text-base' : 'text-lg';
  const orientationClasses = orientation === 'vertical' ? 'flex flex-col items-start gap-1' : 'flex items-center gap-2';
  const discountClasses = hasDiscount ? 'text-red-500' : '';
  const classes = [orientationClasses, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <span className={`font-bold ${sizeClasses} text-gray-900`} aria-label={`Current price: ${formatPrice(price, currency, showCurrency)}`}>
        {formatPrice(price, currency, showCurrency)}
      </span>
      {hasDiscount && (
        <>
          <span className={`line-through text-gray-400 ml-2`} aria-label={`Original price: ${formatPrice(originalPrice, currency, showCurrency)}`}>
            {formatPrice(originalPrice, currency, showCurrency)}
          </span>
          <Badge variant="sale" size="small" className="ml-2">
            -{discountPercentage}%
          </Badge>
          <span className="ml-2 text-xs text-green-600 font-medium">
            Save {formatPrice(discountAmount, currency, showCurrency)}
          </span>
        </>
      )}
    </div>
  );
};

export default ProductPrice;