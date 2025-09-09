/**
 * Centralized component exports for easy importing
 */

// Common UI Components
export { default as Button } from './common/Button';
export { default as Badge } from './common/Badge';
export { default as Rating } from './common/Rating';

// Product Components
export { default as ProductCard } from './product/ProductCard';
export { default as ProductPrice } from './product/ProductPrice';

// Cart Components
export { default as CartItem } from './cart/CartItem';
export { default as CartSummary } from './cart/CartSummary';

// Navigation Components
export { default as SearchBar } from './navigation/SearchBar';

// Layout Components
export { default as Header } from './layout/Header';

/**
 * Usage examples:
 * 
 * import { Button, ProductCard, CartSummary } from './components';
 * 
 * Or individual imports:
 * import Button from './components/common/Button';
 */