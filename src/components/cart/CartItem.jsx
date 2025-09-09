import { useState } from 'react';
import Button from '../common/Button';
import ProductPrice from '../product/ProductPrice';
import './CartItem.css';

/**
 * Cart Item component for displaying individual items in shopping cart
 */
const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  className = '',
  showControls = true
}) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    id,
    name,
    price,
    originalPrice,
    image,
    variant = {},
    maxQuantity = 10
  } = item;

  const totalPrice = price * quantity;
  const originalTotalPrice = originalPrice ? originalPrice * quantity : null;

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > maxQuantity) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    
    if (onUpdateQuantity) {
      try {
        await onUpdateQuantity(id, newQuantity);
      } catch {
        // Revert on error
        setQuantity(quantity);
      }
    }
    
    setIsUpdating(false);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
    }
  };

  const incrementQuantity = () => handleQuantityChange(quantity + 1);
  const decrementQuantity = () => handleQuantityChange(quantity - 1);

  return (
    <div className={`cart-item ${className}`}>
      <div className="cart-item__image">
        <img 
          src={image} 
          alt={name}
          className="cart-item__img"
          loading="lazy"
        />
      </div>

      <div className="cart-item__details">
        <div className="cart-item__info">
          <h3 className="cart-item__name">{name}</h3>
          {variant.color && (
            <p className="cart-item__variant">
              Color: <span className="cart-item__variant-value">{variant.color}</span>
            </p>
          )}
          {variant.size && (
            <p className="cart-item__variant">
              Size: <span className="cart-item__variant-value">{variant.size}</span>
            </p>
          )}
        </div>

        <div className="cart-item__pricing">
          <ProductPrice
            price={totalPrice}
            originalPrice={originalTotalPrice}
            size="small"
          />
          {quantity > 1 && (
            <p className="cart-item__unit-price">
              ${price.toFixed(2)} each
            </p>
          )}
        </div>
      </div>

      {showControls && (
        <div className="cart-item__controls">
          <div className="cart-item__quantity">
            <Button
              variant="ghost"
              size="small"
              onClick={decrementQuantity}
              disabled={quantity <= 1 || isUpdating}
              aria-label="Decrease quantity"
              className="cart-item__quantity-btn"
            >
              -
            </Button>
            
            <span className="cart-item__quantity-value" aria-label={`Quantity: ${quantity}`}>
              {quantity}
            </span>
            
            <Button
              variant="ghost"
              size="small"
              onClick={incrementQuantity}
              disabled={quantity >= maxQuantity || isUpdating}
              aria-label="Increase quantity"
              className="cart-item__quantity-btn"
            >
              +
            </Button>
          </div>

          <Button
            variant="ghost"
            size="small"
            onClick={handleRemove}
            aria-label="Remove item from cart"
            className="cart-item__remove"
          >
            🗑️
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartItem;