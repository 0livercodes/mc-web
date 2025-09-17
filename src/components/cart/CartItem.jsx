  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
    }
  };
import { useState } from 'react';
import Button from '../common/Button';
import ProductPrice from '../product/ProductPrice';
// Tailwind CSS used for styling

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
      await onUpdateQuantity(id, newQuantity);
    }
    setIsUpdating(false);
  };

  const incrementQuantity = () => handleQuantityChange(quantity + 1);
  const decrementQuantity = () => handleQuantityChange(quantity - 1);

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 py-3 border-b border-gray-200 ${className}`}>
      <img 
        src={image} 
        alt={name}
        className="w-20 h-20 object-cover rounded shadow"
        loading="lazy"
      />
      <div className="flex-1 w-full">
        <h3 className="font-medium text-gray-900 truncate text-base">{name}</h3>
        <div className="flex gap-2 text-xs text-gray-500 mt-1">
          {variant.color && (
            <span>Color: <span className="font-semibold text-gray-700">{variant.color}</span></span>
          )}
          {variant.size && (
            <span>Size: <span className="font-semibold text-gray-700">{variant.size}</span></span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <ProductPrice
            price={totalPrice}
            originalPrice={originalTotalPrice}
            size="small"
          />
          {quantity > 1 && (
            <span className="text-xs text-gray-400">${price.toFixed(2)} each</span>
          )}
        </div>
      </div>
      {showControls && (
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="small"
              onClick={decrementQuantity}
              disabled={quantity <= 1 || isUpdating}
              aria-label="Decrease quantity"
              className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-lg"
            >
              -
            </Button>
            <span className="px-2 text-gray-800 text-sm font-medium" aria-label={`Quantity: ${quantity}`}>
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="small"
              onClick={incrementQuantity}
              disabled={quantity >= maxQuantity || isUpdating}
              aria-label="Increase quantity"
              className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-lg"
            >
              +
            </Button>
          </div>
          <Button
            variant="ghost"
            size="small"
            onClick={handleRemove}
            aria-label="Remove item from cart"
            className="text-gray-400 hover:text-red-500 text-xl"
          >
            🗑️
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartItem;