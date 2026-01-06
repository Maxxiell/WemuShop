import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import CartPopup from './CartPopup';
import './ProductComponent.css';

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const searchQuery = useSelector((state) => state.allProducts.searchQuery);
  const dispatch = useDispatch();
  const [popupProduct, setPopupProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    setPopupProduct(product);
    setIsPopupOpen(true);
  };

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const renderList = filteredProducts.map((product) => {
    const { id, title, image, price, category, rating } = product;
    // Only show discount on select items (e.g., electronics and jewelry)
    const hasDiscount = category === 'electronics' || category === 'jewelery';
    const discountPrice = hasDiscount ? (price * 0.85).toFixed(2) : price.toFixed(2);
    
    return (
      <div className="product-card" key={id}>
        <Link to={`/product/${id}`} className="product-link">
          <div className="product-image-wrapper">
            <img src={image} alt={title} className="product-image" />
            {hasDiscount && <div className="product-badge">15% OFF</div>}
          </div>
          <div className="product-info">
            <div className="product-category">{category}</div>
            <h3 className="product-title">{title}</h3>
            <div className="product-rating">
              {rating && (
                <>
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">({rating.rate})</span>
                </>
              )}
            </div>
            <div className="product-pricing">
              <span className="product-price">${discountPrice}</span>
              {hasDiscount && <span className="product-original-price">${price.toFixed(2)}</span>}
            </div>
          </div>
        </Link>
        <div className="product-actions">
          <button
            className="save-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Add save functionality
            }}
            title="Save for later"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button
            className="add-to-cart-btn"
            onClick={(e) => handleAddToCart(e, product)}
          >
            Add to Cart
          </button>
          <button
            className="buy-now-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart(e, product);
              // TODO: Navigate to checkout
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="products-grid">{renderList}</div>
      <CartPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        product={popupProduct}
      />
    </>
  );
};

export default ProductComponent;
