import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';
import axios from 'axios';
import './FilterSidebar.css';

const FilterSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('default');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);

  const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    try {
      const url = category === 'all' 
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${category}`;
      const response = await axios.get(url);
      dispatch(setProducts(response.data));
    } catch (err) {
      console.log("Err", err);
    }
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    const sortedProducts = [...products];
    
    switch(sortType) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        return;
    }
    
    dispatch(setProducts(sortedProducts));
  };

  return (
    <aside className="filter-sidebar">
      <h2 className="filter-title">Filters</h2>
      
      <div className="filter-section">
        <h3 className="filter-section-title">Category</h3>
        <div className="filter-options">
          {categories.map((category) => (
            <label key={category} className="filter-option">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-section-title">Sort By</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="sort"
              value="default"
              checked={sortBy === 'default'}
              onChange={() => handleSortChange('default')}
            />
            <span>Default</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="sort"
              value="price-low"
              checked={sortBy === 'price-low'}
              onChange={() => handleSortChange('price-low')}
            />
            <span>Price: Low to High</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="sort"
              value="price-high"
              checked={sortBy === 'price-high'}
              onChange={() => handleSortChange('price-high')}
            />
            <span>Price: High to Low</span>
          </label>
          <label className="filter-option">
            <input
              type="radio"
              name="sort"
              value="rating"
              checked={sortBy === 'rating'}
              onChange={() => handleSortChange('rating')}
            />
            <span>Highest Rated</span>
          </label>
        </div>
      </div>

      <button 
        className="clear-filters-btn"
        onClick={() => {
          setSelectedCategory('all');
          setSortBy('default');
          handleCategoryChange('all');
        }}
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;

