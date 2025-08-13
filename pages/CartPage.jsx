import React from "react";
import { useCart } from "../src/CartContext";
import { Link } from "react-router-dom";
import "./CartPage.css";
import ae from "/assets/Misc/payment.png";
import mc from "/assets/Misc/payment-1.png";
import paypal from "/assets/Misc/payment-2.png";
import visa from "/assets/Misc/payment-3.png";
import ap from "/assets/Misc/payment-4.png";

const CartPage = () => {
  const {
    cartItems = [],
    savedItems = [],
    removeFromCart,
    removeFromSaved,
    updateQuantity,
    moveToCart,
    removeAllFromCart,
  } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) updateQuantity(itemId, newQuantity);
  };

  const calculateSubtotal = () =>
    cartItems
      .reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 1), 0)
      .toFixed(2);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>My cart <span className="cart-count">({cartItems.length})</span></h2>
      </div>

      <div className="cart-layout">
        {/* LEFT  cart items */}
        <div className="cart-left">
          <div className="cart-left-inner">
            {cartItems.length === 0 ? (
              <div className="empty-cart">Your cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img className="cart-item-image" src={item.image} alt={item.name} />

                  <div className="cart-item-body">
                    <div className="cart-item-top">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                    </div>
                              {/*
                              show additional details if available using api --> features
                              */}
                    <p className="cart-item-meta">Size: medium, Color: blue, Material: Plastic</p>
                    <p className="cart-item-seller">Seller: Artel Market</p>

                    <div className="cart-item-actions">
                      <button className="btn-text" onClick={() => removeFromCart(item.id)}>Remove</button>

                      
                      {typeof moveToSaved === "function" ? (
                        <button className="btn-outline" onClick={() => moveToSaved(item)}>Save for later</button>
                      ) : null}
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-select">
                      <select
                        aria-label="Quantity"
                        value={item.quantity || 1}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      >
                        {[...Array(10).keys()].map((n) => (
                          <option key={n + 1} value={n + 1}>Qty: {n + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className="cart-footer-actions">
                <Link to="/products" className="btn-primary small">← Back to shop</Link>
                <button className="btn-ghost" onClick={removeAllFromCart}>Remove all</button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT summary */}
        <aside className="cart-right">
          <div className="summary-card coupon-card">
            <h4>Have a coupon?</h4>
            <div className="coupon-row">
              <input className="coupon-input" type="text" placeholder="Add coupon" />
              <button className="btn-apply">Apply</button>
            </div>
          </div>

          <div className="summary-card totals-card">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="summary-row">
              <span>Discount:</span>
              <span className="discount">- $0.00</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span className="tax">+ $0.00</span>
            </div>

            <div className="summary-total">
              <div>Total:</div>
              <div className="amount">${calculateSubtotal()}</div>
            </div>

            <button className="checkout-btn">Checkout</button>

            <div className="payment-methods" aria-hidden>
              
              <div className="payment-logos">
                <img src={ae} alt="American Express" />
                <img src={mc} alt="Master Card" />
                <img src={paypal} alt="Paypal" />
                <img src={visa} alt="Visa" />
                <img src={ap} alt="Apple Pay" />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Features strip */}
      <div className="features-strip">
        <div className="feature">
          <div className="feature-title">Secure payment</div>
          <div className="feature-sub">Have you ever finally just</div>
        </div>
        <div className="feature">
          <div className="feature-title">Customer support</div>
          <div className="feature-sub">Have you ever finally just</div>
        </div>
        <div className="feature">
          <div className="feature-title">Free delivery</div>
          <div className="feature-sub">Have you ever finally just</div>
        </div>
      </div>

      {/* Saved for later */}
      {savedItems.length > 0 && (
        <section className="saved-for-later-section">
          <h3>Saved for later</h3>
          <div className="saved-grid">
            {savedItems.map((item) => (
              <div key={item.id} className="saved-card">
                <div className="saved-thumb-wrap">
                  <img className="saved-thumb" src={item.image} alt={item.name} />
                </div>

                <div className="saved-info">
                  <p className="saved-price">${Number(item.price).toFixed(2)}</p>
                  <p className="saved-name">{item.name}</p>

                  <div className="saved-actions">
                    <button className="btn-outline" onClick={() => moveToCart(item)}>Move to cart</button>
                    <button className="btn-text" onClick={() => removeFromSaved(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CartPage;
