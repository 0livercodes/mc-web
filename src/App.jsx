import { useState } from 'react';
import Header from './components/layout/Header';
import ProductCard from './components/product/ProductCard';
import ProductPrice from './components/product/ProductPrice';
import CartItem from './components/cart/CartItem';
import CartSummary from './components/cart/CartSummary';
import Button from './components/common/Button';
import Rating from './components/common/Rating';
import Badge from './components/common/Badge';
import { sampleProducts, sampleCartItems } from './data/sampleProducts';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [cartItemCount, setCartItemCount] = useState(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  const [promoCode, setPromoCode] = useState('');

  // Sample cart calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoCode === 'SAVE10' ? subtotal * 0.1 : 0;
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal - discount + tax + shipping;

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product.name);
    setCartItemCount(prev => prev + 1);
  };

  const handleQuickView = (product) => {
    console.log('Quick view:', product.name);
  };

  const handleWishlist = (product, isAdding) => {
    console.log(isAdding ? 'Added to wishlist:' : 'Removed from wishlist:', product.name);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
    setCartItemCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    setCartItemCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
  };

  return (
    <div className="app">
      <Header
        cartItemCount={cartItemCount}
        isAuthenticated={true}
        user={{ name: 'John Doe', avatar: '👤' }}
        onSearch={handleSearch}
        onCartClick={() => console.log('Cart clicked')}
        onAuthClick={() => console.log('Auth clicked')}
      />

      <main className="app__main">
        <div className="app__container">
          
          {/* Hero Section */}
          <section className="app__hero">
            <h1 className="app__title">Ecommerce Component Showcase</h1>
            <p className="app__subtitle">
              Industry-standard React components for modern ecommerce websites
            </p>
          </section>

          {/* Component Demos */}
          <section className="app__section">
            <h2 className="app__section-title">UI Components</h2>
            <div className="app__demo-grid">
              <div className="app__demo-item">
                <h3>Buttons</h3>
                <div className="app__button-grid">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button loading>Loading...</Button>
                </div>
              </div>

              <div className="app__demo-item">
                <h3>Badges</h3>
                <div className="app__badge-grid">
                  <Badge variant="sale">Sale</Badge>
                  <Badge variant="new">New</Badge>
                  <Badge variant="bestseller">Best Seller</Badge>
                  <Badge variant="out-of-stock">Out of Stock</Badge>
                  <Badge variant="limited">Limited</Badge>
                  <Badge variant="featured">Featured</Badge>
                </div>
              </div>

              <div className="app__demo-item">
                <h3>Ratings</h3>
                <div className="app__rating-grid">
                  <Rating value={4.5} readOnly showValue />
                  <Rating value={3} readOnly />
                  <Rating value={5} readOnly size="small" />
                  <Rating value={2.5} readOnly size="large" />
                </div>
              </div>

              <div className="app__demo-item">
                <h3>Product Pricing</h3>
                <div className="app__price-grid">
                  <ProductPrice price={99.99} originalPrice={129.99} />
                  <ProductPrice price={49.99} size="large" />
                  <ProductPrice 
                    price={199.99} 
                    originalPrice={249.99} 
                    orientation="vertical"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Product Grid */}
          <section className="app__section">
            <h2 className="app__section-title">Product Components</h2>
            <div className="app__product-grid">
              {sampleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                  onWishlist={handleWishlist}
                />
              ))}
            </div>
          </section>

          {/* Cart Demo */}
          <section className="app__section">
            <h2 className="app__section-title">Shopping Cart Components</h2>
            <div className="app__cart-demo">
              <div className="app__cart-items">
                <h3>Cart Items</h3>
                <div className="app__cart-list">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>

              <div className="app__cart-summary">
                <CartSummary
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shipping}
                  discount={discount}
                  total={total}
                  promoCode={promoCode}
                  onPromoCodeChange={setPromoCode}
                  onApplyPromo={() => console.log('Applying promo:', promoCode)}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="app__footer">
            <p>Built with industry-standard React components for ecommerce</p>
            <p>Components include accessibility, responsive design, and modern UI patterns</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
