import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const rating = Math.round(product.rating || 4);

  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <span className="category-badge">{product.category}</span>
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className="product-image"
        />
        <div className="card-overlay-actions">
          <Link to={`/product/${product.id}`} className="icon-btn view-btn" title="View Details">
            <Eye size={18} />
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="icon-btn add-btn"
            title="Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="rating-stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < rating ? 'star-filled' : 'star-empty'}
            />
          ))}
          <span className="rating-num">({product.rating || 4.5})</span>
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>

        <p className="product-desc-short">
          {product.description?.substring(0, 60)}...
        </p>

        <div className="card-footer-flex">
          <div className="price-tag">
            <span className="current-price">${product.price}</span>
            {product.discountPercentage && (
              <span className="old-price">
                ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          <button onClick={() => addToCart(product)} className="btn-add-cart">
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
