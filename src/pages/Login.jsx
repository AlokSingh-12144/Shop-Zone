import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCheck, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Login = () => {
  const { login } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectPath = location.state?.from?.pathname || '/';

  const handleGuestLogin = () => {
    login({
      name: 'Guest User',
      email: 'guest.shopper@shopzone.com',
      role: 'Guest'
    });
    navigate(redirectPath, { replace: true });
  };

  const handleCustomLogin = (e) => {
    e.preventDefault();
    if (!email) return;
    login({
      name: email.split('@')[0],
      email: email,
      role: 'User'
    });
    navigate(redirectPath, { replace: true });
  };

  return (
    <div className="login-page container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon-badge">
            <Lock size={28} />
          </div>
          <h2>Welcome to ShopZone</h2>
          <p>
            {location.state?.from
              ? 'Please log in to access the protected Checkout page.'
              : 'Sign in to access your saved cart, orders, and checkout persistence.'}
          </p>
        </div>

        <div className="guest-login-box">
          <div className="guest-info">
            <h4>Quick One-Click Access</h4>
            <p>No registration required. Instantiate global state immediately.</p>
          </div>
          <button onClick={handleGuestLogin} className="btn-guest-login">
            <UserCheck size={18} /> Login as Guest
          </button>
        </div>

        <div className="or-divider">
          <span>OR SIGN IN WITH EMAIL</span>
        </div>

        <form onSubmit={handleCustomLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary login-submit-btn">
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-footer-info">
          <ShieldCheck size={16} />
          <span>State persists across reloads via localStorage API.</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
