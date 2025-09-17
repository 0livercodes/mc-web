import { useState } from 'react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Rating from '../common/Rating';

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
    <article className={`rounded-lg shadow bg-white flex flex-col ${className}`}>
      <div className="relative overflow-hidden rounded-t-lg">
        {badge && (
          <Badge 
            variant={badge.variant || 'default'} 
            className="absolute top-2 left-2 z-10"
          >
            {badge.text}
          </Badge>
        )}
        <img
          src={image}
          alt={name}
          className={`w-full h-56 object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-end justify-end gap-2 p-2 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 to-transparent">
          <Button
            variant="ghost"
            size="small"
            onClick={handleQuickView}
            aria-label="Quick view"
          >
            👁
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={handleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={isWishlisted ? 'text-red-500' : ''}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">{name}</h3>
          {layout === 'list' && description && (
            <p className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Rating 
            value={rating} 
            readOnly 
            size="small" 
          />
          {reviewCount > 0 && (
            <span className="text-gray-400">({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
          {originalPrice && originalPrice > price && (
            <>
              <span className="line-through text-gray-400">${originalPrice.toFixed(2)}</span>
              <Badge variant="sale" size="small">
                -{discountPercentage}%
              </Badge>
            </>
          )}
        </div>
        <div className="mt-auto">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            fullWidth={layout === 'grid'}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;