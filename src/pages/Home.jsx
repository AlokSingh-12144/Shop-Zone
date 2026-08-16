import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8')
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">
              <Sparkles size={16} /> New Season Arrivals
            </span>
            <h1 className="hero-title">
              Elevate Your Shopping <span className="highlight-text">Experience</span>
            </h1>
            <p className="hero-description">
              Explore handpicked premium collections, lightning-fast client routing, and instant cart hydration at ShopZone.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary">
                Explore Inventory <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Customer Support
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-box">
                <span className="stat-value">1,000+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">99.8%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">24h</span>
                <span className="stat-label">Fast Shipping</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card-backdrop"></div>
            <div className="visual-card">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
                alt="Shopping Banner"
                className="hero-image"
              />
              <div className="floating-badge top-right">
                <TrendingUp size={16} className="badge-icon" />
                <span>Trending Now</span>
              </div>
              <div className="floating-badge bottom-left">
                <Zap size={16} className="badge-icon" />
                <span>Up to 40% Off</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section container">
        <div className="section-header text-center">
          <h2 className="section-title">Popular Categories</h2>
          <p className="section-subtitle">Discover popular picks across top categories</p>
        </div>
        <div className="categories-grid">
          <Link to="/shop?category=beauty" className="category-card beauty">
            <div className="category-icon-wrap">💄</div>
            <h3>Beauty & Cosmetics</h3>
            <span>Explore Products</span>
          </Link>
          <Link to="/shop?category=fragrances" className="category-card fragrances">
            <div className="category-icon-wrap">✨</div>
            <h3>Fragrances</h3>
            <span>Explore Products</span>
          </Link>
          <Link to="/shop?category=furniture" className="category-card furniture">
            <div className="category-icon-wrap">🛋️</div>
            <h3>Home & Furniture</h3>
            <span>Explore Products</span>
          </Link>
          <Link to="/shop?category=groceries" className="category-card groceries">
            <div className="category-icon-wrap">🍎</div>
            <h3>Groceries</h3>
            <span>Explore Products</span>
          </Link>
        </div>
      </section>

      <section className="featured-section container">
        <div className="section-header flex-between">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Top-rated items fetched live from REST API</p>
          </div>
          <Link to="/shop" className="view-all-link">
            View All Catalog <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Hydrating inventory from REST endpoint...</p>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="promo-banner-section container">
        <div className="promo-card">
          <div className="promo-content">
            <span className="promo-tag">Limited Time Offer</span>
            <h2>Get 20% Off Your First Order</h2>
            <p>Join thousands of happy customers using ShopZone single page application.</p>
            <Link to="/shop" className="btn-primary promo-btn">
              Shop Now <ShoppingBag size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
