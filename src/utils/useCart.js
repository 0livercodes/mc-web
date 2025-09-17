import { useState, useMemo } from 'react';
import { sampleCartItems } from '../data/sampleProducts';

export function useCart() {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [promoCode, setPromoCode] = useState('');

  // Cart calculations
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cartItems]);
  const discount = useMemo(() => (promoCode === 'SAVE10' ? subtotal * 0.1 : 0), [promoCode, subtotal]);
  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  const shipping = useMemo(() => (subtotal > 50 ? 0 : 9.99), [subtotal]);
  const total = useMemo(() => subtotal - discount + tax + shipping, [subtotal, discount, tax, shipping]);
  const cartItemCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const handleAddToCart = (product) => {
    // Example: just increment count, real logic would add to cartItems
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return {
    cartItems,
    setCartItems,
    promoCode,
    setPromoCode,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    cartItemCount,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
  };
}
