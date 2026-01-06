import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "../contexts/ThemeContext";
import { setSearchQuery } from "../redux/actions/productActions";
import "./Header.css";

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const searchQuery = useSelector((state) => state.allProducts.searchQuery);
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearchQuery));
    if (window.location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
    if (e.target.value === "") {
      dispatch(setSearchQuery(""));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <header className="sleek-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <svg 
            className="logo-icon" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span className="logo-text">WemuShop</span>
        </Link>

        <form className="header-search" onSubmit={handleSearch}>
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button type="submit" className="search-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>

        <nav className="header-nav">
          <Link to="/profile" className="nav-item" title="Profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>

          <Link to="/cart" className="nav-item" title="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cart.totalItems > 0 && (
              <span className="cart-count">{cart.totalItems}</span>
            )}
          </Link>

          <button className="nav-item theme-toggle" onClick={toggleTheme} title="Toggle dark mode">
            {isDarkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
