/**
 * Sample product data for demonstration
 */

export const sampleProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 127,
    badge: { text: 'Best Seller', variant: 'bestseller' },
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    isOutOfStock: false,
    maxQuantity: 5
  },
  {
    id: 2,
    name: 'Smartphone Case - Clear',
    price: 24.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
    rating: 4.2,
    reviewCount: 89,
    badge: { text: 'New', variant: 'new' },
    description: 'Crystal clear protection for your smartphone with raised edges for camera protection.',
    isOutOfStock: false,
    maxQuantity: 10
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 203,
    badge: { text: 'Sale', variant: 'sale' },
    description: 'Comfortable ergonomic chair with lumbar support, perfect for long working hours.',
    isOutOfStock: false,
    maxQuantity: 3
  },
  {
    id: 4,
    name: 'Vintage Leather Jacket',
    price: 189.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    rating: 4.3,
    reviewCount: 56,
    badge: null,
    description: 'Classic vintage-style leather jacket made from genuine leather.',
    isOutOfStock: true,
    maxQuantity: 2
  },
  {
    id: 5,
    name: 'Fitness Tracker Watch',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop',
    rating: 4.1,
    reviewCount: 312,
    badge: { text: 'Limited', variant: 'limited' },
    description: 'Advanced fitness tracker with heart rate monitoring and GPS functionality.',
    isOutOfStock: false,
    maxQuantity: 8
  },
  {
    id: 6,
    name: 'Coffee Maker - Stainless Steel',
    price: 89.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 178,
    badge: { text: 'Featured', variant: 'featured' },
    description: 'Professional-grade coffee maker with programmable settings and thermal carafe.',
    isOutOfStock: false,
    maxQuantity: 4
  }
];

export const sampleCartItems = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    quantity: 1,
    variant: { color: 'Black', size: null },
    maxQuantity: 5
  },
  {
    id: 2,
    name: 'Smartphone Case - Clear',
    price: 24.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
    quantity: 2,
    variant: { color: 'Clear', size: 'iPhone 15' },
    maxQuantity: 10
  }
];