import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, adjustQuantity } from '../redux/actions/cartActions';
import './CartPopup.css';

const CartPopup = ({ isOpen, onClose, product }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  const cartItem = cart.items.find(item => item.id === product?.id);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
    onClose();
  };

  const handleIncrease = () => {
    if (cartItem) {
      dispatch(adjustQuantity(product.id, cartItem.quantity + 1));
    }
  };

  const handleDecrease = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(adjustQuantity(product.id, cartItem.quantity - 1));
    } else if (cartItem && cartItem.quantity === 1) {
      handleRemove();
    }
  };

  return (
    <div className="cart-popup-overlay" onClick={onClose}>
      <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
        <div className="cart-popup-header">
          <h3>Item Added to Cart</h3>
          <button className="cart-popup-close" onClick={onClose}>×</button>
        </div>
        <div className="cart-popup-content">
          <div className="cart-popup-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="cart-popup-info">
            <h4>{product.title}</h4>
            <p className="cart-popup-price">${product.price.toFixed(2)}</p>
            {cartItem && (
              <div className="cart-popup-quantity">
                <span>Quantity: </span>
                <div className="quantity-controls">
                  <button onClick={handleDecrease}>−</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={handleIncrease}>+</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="cart-popup-actions">
          <button className="cart-popup-continue" onClick={onClose}>
            Continue Shopping
          </button>
          {cartItem && (
            <button className="cart-popup-remove" onClick={handleRemove}>
              Remove from Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPopup;

