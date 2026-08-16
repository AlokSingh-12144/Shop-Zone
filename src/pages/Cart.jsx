import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Plus, Minus, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const shippingCost = totalPrice > 50 || totalItems === 0 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-page container empty-state">
        <div className="empty-cart-icon-wrapper">
          <ShoppingBag size={56} />
        </div>
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/shop" className="btn-primary">
          <ArrowLeft size={16} /> Explore Product Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Shopping Cart</h1>
          <p className="page-subtitle">Manage items, quantities, and order totals</p>
        </div>
        <button onClick={clearCart} className="btn-outline-danger">
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      <div className="cart-layout-grid">
        <div className="cart-items-column">
          <div className="cart-table-header">
            <span>Product Details</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Action</span>
          </div>

          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="item-info">
                  <img src={item.thumbnail} alt={item.title} className="item-thumb" />
                  <div>
                    <span className="item-category">{item.category}</span>
                    <h4 className="item-title">
                      <Link to={`/product/${item.id}`}>{item.title}</Link>
                    </h4>
                  </div>
                </div>

                <div className="item-unit-price">${item.price.toFixed(2)}</div>

                <div className="item-qty-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn-sm"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="qty-num">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn-sm"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="item-line-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <div className="item-remove">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn-icon-trash"
                    title="Remove Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer-nav">
            <Link to="/shop" className="continue-shopping">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        </div>

        <div className="cart-summary-column">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Estimated Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
            </div>

            <div className="summary-row">
              <span>Estimated Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Grand Total</span>
              <span className="grand-price">${grandTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary checkout-btn"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div className="checkout-trust-badge">
              <ShieldCheck size={18} />
              <span>Protected Route & Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
