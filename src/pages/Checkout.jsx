import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, totalPrice, totalItems, clearCart, user } = useCart();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '123 Main Street',
    city: 'New York',
    zipCode: '10001',
    paymentMethod: 'card'
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shippingCost = totalPrice * 84 > 4200 ? 0 : 849;
  const tax = totalPrice * 84 * 0.08;
  const grandTotal = totalPrice * 84 + shippingCost + tax;

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = 'SZ-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="checkout-page container empty-state">
        <div className="order-success-card">
          <div className="success-icon-badge">
            <CheckCircle2 size={64} />
          </div>
          <h2>Order Confirmed!</h2>
          <p className="order-number">Order ID: <strong>#{orderId}</strong></p>
          <p className="success-msg">
            Thank you, <strong>{shippingInfo.fullName}</strong>! We've received your order and sent a confirmation to <strong>{shippingInfo.email}</strong>.
          </p>

          <div className="order-receipt-summary">
            <div className="receipt-row">
              <span>Status:</span>
              <span className="badge-paid">Processing Delivery</span>
            </div>
            <div className="receipt-row">
              <span>Total Paid:</span>
              <strong>₹{grandTotal.toFixed(0)}</strong>
            </div>
            <div className="receipt-row">
              <span>Shipping Address:</span>
              <span>{shippingInfo.address}, {shippingInfo.city} {shippingInfo.zipCode}</span>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/shop" className="btn-primary">
              <ShoppingBag size={18} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page container empty-state">
        <ShoppingBag size={48} />
        <h2>No Items to Checkout</h2>
        <p>Your cart is empty. Add products before proceeding to checkout.</p>
        <Link to="/shop" className="btn-primary">
          <ArrowLeft size={16} /> Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <div className="page-header">
        <h1 className="page-title">Secure Checkout</h1>
        <p className="page-subtitle">Complete your order details and payment</p>
      </div>

      <div className="checkout-grid">
        <div className="checkout-form-column">
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="checkout-section-card">
              <h3><Truck size={20} /> Shipping Details</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ZIP / Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="checkout-section-card">
              <h3><CreditCard size={20} /> Payment Method</h3>
              <div className="payment-options">
                <label className={`payment-radio ${shippingInfo.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={shippingInfo.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <span>Credit / Debit Card</span>
                </label>

                <label className={`payment-radio ${shippingInfo.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={shippingInfo.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {shippingInfo.paymentMethod === 'card' && (
                <div className="card-input-box">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="4532 •••• •••• 8892" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                      <label>CVC</label>
                      <input type="text" placeholder="123" required />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary place-order-btn">
              <Lock size={18} /> Place Order (₹{grandTotal.toFixed(0)})
            </button>
          </form>
        </div>

        <div className="checkout-summary-column">
          <div className="summary-card">
            <h3>Order Review ({totalItems} items)</h3>
            <div className="checkout-items-mini">
              {cart.map((item) => (
                <div key={item.id} className="mini-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="mini-details">
                    <span className="mini-title">{item.title}</span>
                    <span className="mini-qty-price">
                    {item.quantity} × ₹{(item.price * 84).toFixed(0)}
                    </span>
                  </div>
                  <span className="mini-total">₹{(item.price * 84 * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{(totalPrice * 84).toFixed(0)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(0)}`}</span>
            </div>
            <div className="summary-row">
              <span>Taxes (8%)</span>
              <span>₹{tax.toFixed(0)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total Due</span>
              <span className="grand-price">₹{grandTotal.toFixed(0)}</span>
            </div>

            <div className="checkout-trust-badge">
              <ShieldCheck size={18} />
              <span>100% Encrypted & Safe Transaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
