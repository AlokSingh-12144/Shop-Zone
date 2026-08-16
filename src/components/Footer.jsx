import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Headset } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-features-bar">
        <div className="footer-container features-grid">
          <div className="feature-item">
            <Truck className="feature-icon" />
            <div>
              <h4>Free Delivery</h4>
              <p>On all orders over $50</p>
            </div>
          </div>
          <div className="feature-item">
            <ShieldCheck className="feature-icon" />
            <div>
              <h4>Secure Payments</h4>
              <p>100% encrypted checkout</p>
            </div>
          </div>
          <div className="feature-item">
            <RotateCcw className="feature-icon" />
            <div>
              <h4>30 Days Return</h4>
              <p>Hassle-free return policy</p>
            </div>
          </div>
          <div className="feature-item">
            <Headset className="feature-icon" />
            <div>
              <h4>24/7 Support</h4>
              <p>Dedicated customer service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-container footer-main">
        <div className="footer-col brand-col">
          <Link to="/" className="navbar-brand">
            <div className="brand-logo">
              <Sparkles className="brand-icon" />
            </div>
            <span className="brand-title">Shop<span>Zone</span></span>
          </Link>
          <p className="brand-desc">
            Your premier destination for high-quality products, instant order hydration, and seamless single-page shopping.
          </p>
        </div>

        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/">Home View</Link></li>
            <li><Link to="/shop">Product Catalog</Link></li>
            <li><Link to="/contact">Support & Contact</Link></li>
            <li><Link to="/cart">Cart Summary</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Categories</h5>
          <ul>
            <li><Link to="/shop">Beauty & Skincare</Link></li>
            <li><Link to="/shop">Fragrances & Perfumes</Link></li>
            <li><Link to="/shop">Home Decor & Furniture</Link></li>
            <li><Link to="/shop">Groceries & Daily Essentials</Link></li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h5>Newsletter</h5>
          <p>Subscribe for exclusive deals and instant updates.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="button">Join</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container bottom-flex">
          <p>&copy; {new Date().getFullYear()} ShopZone SPA Inc. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
