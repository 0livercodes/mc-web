import { useState } from 'react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Rating from '../common/Rating';
import './ProductCard.css';

/**
 * Product Card component for displaying products in grid/list view
 * Industry standard design with image, title, price, rating, and actions
 */
const ProductCard = ({
  product,
  onAddToCart,
  onQuickView,
  onWishlist,
  className = '',
  layout = 'grid' // grid or list
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);

  const {
    name,
    price,
    originalPrice,
    image,
    rating = 0,
    reviewCount = 0,
    badge,
    isOutOfStock = false,
    description = ''
  } = product;

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isOutOfStock && onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    if (onWishlist) {
      onWishlist(product, !isWishlisted);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <article className={`product-card product-card--${layout} ${className}`}>
      <div className="product-card__image-container">
        {badge && (
          <Badge 
            variant={badge.variant || 'default'} 
            className="product-card__badge"
          >
            {badge.text}
          </Badge>
        )}
        
        <img
          src={image}
          alt={name}
          className={`product-card__image ${imageLoaded ? 'product-card__image--loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        <div className="product-card__overlay">
          <div className="product-card__actions">
            <Button
              variant="ghost"
              size="small"
              onClick={handleQuickView}
              className="product-card__action"
              aria-label="Quick view"
            >
              👁
            </Button>
            <Button
              variant="ghost"
              size="small"
              onClick={handleWishlist}
              className={`product-card__action ${isWishlisted ? 'product-card__action--active' : ''}`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isWishlisted ? '❤️' : '🤍'}
            </Button>
          </div>
        </div>
      </div>

      <div className="product-card__content">
        <div className="product-card__header">
          <h3 className="product-card__title">{name}</h3>
          {layout === 'list' && description && (
            <p className="product-card__description">{description}</p>
          )}
        </div>

        <div className="product-card__rating">
          <Rating 
            value={rating} 
            readOnly 
            size="small" 
          />
          {reviewCount > 0 && (
            <span className="product-card__review-count">
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>

        <div className="product-card__pricing">
          <span className="product-card__price">${price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="product-card__original-price">
                ${originalPrice.toFixed(2)}
              </span>
              <Badge variant="sale" size="small" className="product-card__discount">
                -{discountPercentage}%
              </Badge>
            </>
          )}
        </div>

        <div className="product-card__footer">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            fullWidth={layout === 'grid'}
            className="product-card__add-to-cart"
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;