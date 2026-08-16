import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems, isLoggedIn, user, logout } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <Sparkles className="brand-icon" />
          </div>
          <span className="brand-title">Shop<span>Zone</span></span>
        </Link>

        <nav className="navbar-links desktop-only">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Shop
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Contact
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-btn" aria-label="Cart">
            <ShoppingBag className="action-icon" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {isLoggedIn ? (
            <div className="user-profile-menu">
              <span className="user-name">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
              <button onClick={handleLogout} className="logout-btn" title="Logout">
                <LogOut className="action-icon" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-link-btn">
              <User className="action-icon" />
              <span>Login</span>
            </Link>
          )}

          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-drawer">
          <NavLink to="/" onClick={() => setMobileOpen(false)} className="mobile-link">
            Home
          </NavLink>
          <NavLink to="/shop" onClick={() => setMobileOpen(false)} className="mobile-link">
            Shop
          </NavLink>
          <NavLink to="/contact" onClick={() => setMobileOpen(false)} className="mobile-link">
            Contact
          </NavLink>
          <NavLink to="/cart" onClick={() => setMobileOpen(false)} className="mobile-link">
            Cart ({totalItems})
          </NavLink>
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="mobile-link logout">
              Logout
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setMobileOpen(false)} className="mobile-link">
              Login / Guest Access
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
