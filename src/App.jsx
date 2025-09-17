import { useState } from 'react';
import { useCart } from './utils/useCart';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductCard from './components/product/ProductCard';
import ProductPrice from './components/product/ProductPrice';
import CartItem from './components/cart/CartItem';
import CartSummary from './components/cart/CartSummary';
import Button from './components/common/Button';
import Rating from './components/common/Rating';
import Badge from './components/common/Badge';
import { sampleProducts } from './data/sampleProducts';


function App() {
  const {
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
  } = useCart();

  const handleQuickView = (product) => {};
  const handleWishlist = (product, isAdding) => {};
  const handleSearch = (query) => {};
  const handleCheckout = () => {};

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
      <Header
        cartItemCount={cartItemCount}
        isAuthenticated={true}
        user={{ name: 'John Doe', avatar: '👤' }}
        onSearch={handleSearch}
        onCartClick={() => {}}
        onAuthClick={() => {}}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-indigo-400 to-purple-600 text-white rounded-xl mb-12 shadow">
          <h1 className="text-4xl font-bold mb-4">Ecommerce Component Showcase</h1>
          <p className="text-lg opacity-90 mb-0 max-w-xl mx-auto">
            Industry-standard React components for modern ecommerce websites
          </p>
        </section>

        {/* Component Demos */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">UI Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="rounded-lg bg-white p-6 shadow flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
                <Button loading>Loading...</Button>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="sale">Sale</Badge>
                <Badge variant="new">New</Badge>
                <Badge variant="bestseller">Best Seller</Badge>
                <Badge variant="out-of-stock">Out of Stock</Badge>
                <Badge variant="limited">Limited</Badge>
                <Badge variant="featured">Featured</Badge>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ratings</h3>
              <div className="flex flex-col gap-4">
                <Rating value={4.5} readOnly showValue />
                <Rating value={3} readOnly />
                <Rating value={5} readOnly size="small" />
                <Rating value={2.5} readOnly size="large" />
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Pricing</h3>
              <div className="flex flex-col gap-6">
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
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Product Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Shopping Cart Components</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="bg-white rounded-lg p-6 col-span-2 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cart Items</h3>
              <div className="flex flex-col gap-0">
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
            <div className="sticky top-24">
              <CartSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                discount={discount}
                total={total}
                promoCode={promoCode}
                onPromoCodeChange={setPromoCode}
                onApplyPromo={() => {}}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </section>

  {/* Footer */}
  <Footer />
      </main>
    </div>
  );
}

export default App;
