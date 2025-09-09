import Badge from '../common/Badge';
import './ProductPrice.css';

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

  const formatPrice = (amount) => {
    if (!showCurrency) {
      return amount.toFixed(2);
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const classes = [
    'product-price',
    `product-price--${size}`,
    `product-price--${orientation}`,
    hasDiscount ? 'product-price--has-discount' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="product-price__current">
        <span className="product-price__amount" aria-label={`Current price: ${formatPrice(price)}`}>
          {formatPrice(price)}
        </span>
      </div>
      
      {hasDiscount && (
        <>
          <div className="product-price__original">
            <span 
              className="product-price__original-amount"
              aria-label={`Original price: ${formatPrice(originalPrice)}`}
            >
              {formatPrice(originalPrice)}
            </span>
          </div>
          
          <div className="product-price__savings">
            <Badge variant="sale" size="small">
              -{discountPercentage}%
            </Badge>
            <span className="product-price__save-amount">
              Save {formatPrice(discountAmount)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPrice;