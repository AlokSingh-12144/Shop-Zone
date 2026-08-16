import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Shield,
  Truck,
  CheckCircle2,
  Plus,
  Minus,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedImg(data.thumbnail || data.images?.[0] || '');
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container loader-container page-loader">
        <div className="spinner"></div>
        <p>Hydrating product details for ID: #{id}...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container empty-state">
        <AlertCircle size={48} className="error-icon" />
        <h2>Product Not Found</h2>
        <p>We could not find the product details for requested ID #{id}.</p>
        <Link to="/shop" className="btn-primary">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  const rating = Math.round(product.rating || 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-details-page container">
      <div className="breadcrumb-nav">
        <button onClick={() => navigate(-1)} className="btn-back">
          <ArrowLeft size={16} /> Back
        </button>
        <span className="crumb-sep">/</span>
        <Link to="/shop">Shop</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{product.title}</span>
      </div>

      <div className="product-details-grid">
        <div className="gallery-section">
          <div className="main-image-box">
            <img src={selectedImg} alt={product.title} className="main-img" />
            <span className="category-tag">{product.category}</span>
          </div>

          {product.images && product.images.length > 1 && (
            <div className="thumbnails-row">
              {product.images.slice(0, 5).map((imgUrl, index) => (
                <button
                  key={index}
                  className={`thumb-btn ${selectedImg === imgUrl ? 'active' : ''}`}
                  onClick={() => setSelectedImg(imgUrl)}
                >
                  <img src={imgUrl} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <span className="brand-badge">{product.brand || 'ShopZone Premium'}</span>
          <h1 className="details-title">{product.title}</h1>

          <div className="details-rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < rating ? 'star-filled' : 'star-empty'}
                />
              ))}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviews?.length || 12} customer reviews)
            </span>
          </div>

          <div className="details-price-row">
            <span className="details-price">${product.price}</span>
            {product.discountPercentage && (
              <span className="discount-pill">
                {product.discountPercentage}% OFF
              </span>
            )}
            <span className="stock-pill">
              <CheckCircle2 size={14} /> In Stock ({product.stock || 25} units left)
            </span>
          </div>

          <p className="details-description">{product.description}</p>

          <div className="purchase-controls">
            <div className="quantity-selector">
              <span className="qty-label">Qty:</span>
              <div className="qty-btn-group">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  <Minus size={14} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-primary add-to-cart-large">
              <ShoppingCart size={20} /> Add to Cart (${(product.price * quantity).toFixed(2)})
            </button>
          </div>

          <div className="details-perks">
            <div className="perk-card">
              <Truck size={20} />
              <div>
                <strong>Express Delivery</strong>
                <p>Ships within 24 hours</p>
              </div>
            </div>
            <div className="perk-card">
              <Shield size={20} />
              <div>
                <strong>Guarantee & Warranty</strong>
                <p>{product.warrantyInformation || '1-Year Warranty Included'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
