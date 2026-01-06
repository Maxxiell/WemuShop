import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import CartPopup from './CartPopup';
import './ProductDetail.css';

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((err) => {
        console.log('Err', err);
      });

    if (response) {
      dispatch(selectedProduct(response.data));
    }
  };

  useEffect(() => {
    if (productId && productId !== '') fetchProductDetail();
    return () => {
        dispatch(removeSelectedProduct());
    }
  }, [productId, dispatch]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsPopupOpen(true);
  };

  // Loading state
  if (Object.keys(product).length === 0) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  const hasDiscount = product.category === 'electronics' || product.category === 'jewelery';
  const discountPrice = hasDiscount ? (product.price * 0.85).toFixed(2) : product.price.toFixed(2);
  const savings = hasDiscount ? (product.price - discountPrice).toFixed(2) : 0;

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <span>{product.category}</span>
        <span> / </span>
        <span>{product.title}</span>
      </div>

      <div className="product-detail-content">
          <div className="product-detail-image-section">
            <div className="product-image-main">
              <img src={product.image} alt={product.title} />
              {hasDiscount && <div className="sale-badge">15% OFF</div>}
            </div>
          </div>

        <div className="product-detail-info">
          <div className="product-category-badge">{product.category}</div>
          <h1 className="product-detail-title">{product.title}</h1>
          
          {product.rating && (
            <div className="product-detail-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-value">{product.rating.rate}</span>
              <span className="rating-count">({product.rating.count} ratings)</span>
            </div>
          )}

          <div className="product-detail-pricing">
            <div className="price-section">
              <span className="current-price">${discountPrice}</span>
              {hasDiscount && (
                <>
                  <span className="original-price">${product.price.toFixed(2)}</span>
                  <span className="savings">You save ${savings}</span>
                </>
              )}
            </div>
          </div>

          <div className="product-description">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-button">Buy Now</button>
          </div>

          <div className="product-features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Free delivery on orders over $25</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>30-day return policy</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Secure payment</span>
            </div>
          </div>
        </div>
      </div>
      <CartPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        product={product}
      />
    </div>
  );
};

export default ProductDetail;
