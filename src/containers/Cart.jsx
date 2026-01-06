import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, adjustQuantity } from '../redux/actions/cartActions';
import './Cart.css';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(adjustQuantity(productId, newQuantity));
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart to get started!</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <p className="cart-item-category">{item.category}</p>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                <div className="price">${(item.price * item.quantity).toFixed(2)}</div>
                {item.quantity > 1 && (
                  <div className="unit-price">${item.price.toFixed(2)} each</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items ({cart.totalItems}):</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

