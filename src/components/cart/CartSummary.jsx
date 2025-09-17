import Button from '../common/Button';
// Tailwind CSS used for styling

/**
 * Cart Summary component showing totals, taxes, shipping, and checkout actions
 */
const CartSummary = ({
  subtotal = 0,
  tax = 0,
  shipping = 0,
  discount = 0,
  total = 0,
  currency = 'USD',
  promoCode = '',
  onPromoCodeChange,
  onApplyPromo,
  onCheckout,
  checkoutLoading = false,
  className = ''
}) => {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const isPromoApplied = discount > 0;
  const freeShipping = shipping === 0 && subtotal > 0;

  return (
    <div className={`bg-white rounded-lg shadow p-4 flex flex-col gap-3 ${className}`}>
      <h3 className="cart-summary__title">Order Summary</h3>
      
      <div className="cart-summary__breakdown">
        <div className="cart-summary__line">
          <span className="flex justify-between text-gray-700">Subtotal</span>
          <span className="flex justify-between text-gray-700">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="cart-summary__line cart-summary__line--discount">
            <span className="flex justify-between text-gray-700">Discount</span>
            <span className="flex justify-between text-gray-700">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="cart-summary__line">
          <span className="cart-summary__label">
            Shipping
            {freeShipping && (
              <span className="cart-summary__free-badge">FREE</span>
            )}
          </span>
          <span className="cart-summary__value">
            {freeShipping ? formatPrice(0) : formatPrice(shipping)}
          </span>
        </div>

        <div className="cart-summary__line">
          <span className="flex justify-between text-gray-700">Tax</span>
          <span className="flex justify-between text-gray-700">{formatPrice(tax)}</span>
        </div>

        <div className="cart-summary__separator"></div>

        <div className="cart-summary__line cart-summary__line--total">
          <span className="flex justify-between text-lg font-semibold text-gray-900 border-t pt-2 mt-2">Total</span>
          <span className="flex justify-between text-lg font-semibold text-gray-900 border-t pt-2 mt-2">{formatPrice(total)}</span>
        </div>
      </div>

      {onPromoCodeChange && (
        <div className="cart-summary__promo">
          <div className="cart-summary__promo-input">
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
              className="cart-summary__promo-field"
              disabled={isPromoApplied}
            />
            <Button
              variant="secondary"
              size="small"
              onClick={onApplyPromo}
              disabled={!promoCode.trim() || isPromoApplied}
              className="cart-summary__promo-btn"
            >
              {isPromoApplied ? 'Applied' : 'Apply'}
            </Button>
          </div>
          {isPromoApplied && (
            <p className="cart-summary__promo-success">
              ✅ Promo code applied successfully!
            </p>
          )}
        </div>
      )}

      <div className="cart-summary__actions">
        <Button
          onClick={onCheckout}
          loading={checkoutLoading}
          fullWidth
          size="large"
          className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {checkoutLoading ? 'Processing...' : `Checkout ${formatPrice(total)}`}
        </Button>
        
        <div className="cart-summary__security">
          <span className="cart-summary__security-text">
            🔒 Secure checkout with SSL encryption
          </span>
        </div>
      </div>

      {subtotal > 0 && subtotal < 50 && (
        <div className="cart-summary__shipping-notice">
          <p className="cart-summary__notice-text">
            Add {formatPrice(50 - subtotal)} more for FREE shipping!
          </p>
          <div className="cart-summary__progress-bar">
            <div 
              className="cart-summary__progress-fill"
              style={{ width: `${(subtotal / 50) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;