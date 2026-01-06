import React, {useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../redux/actions/productActions';
import ProductComponent from './ProductComponent';
import FilterSidebar from './FilterSidebar';
import './ProductListing.css';

const ProductListing = () => {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            dispatch(setProducts(response.data));
        } catch (err) {
            console.log("Err", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    },[]);
    
  return (
    <div className='product-listing-container'>
        <div className="products-header">
            <h1>Shop Products</h1>
            <p className="products-subtitle">Discover amazing deals on thousands of products</p>
        </div>
        <div className="products-layout">
          <FilterSidebar />
          <ProductComponent />
        </div>
    </div>
  );
};

export default ProductListing;
