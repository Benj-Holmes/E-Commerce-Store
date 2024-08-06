import React from 'react';
import SortBy from './sortBy/sortBy';
import ProductList from './productList/productList';

const ProductPage = () => {
    return (
        <div>
            <SortBy />
            <ProductList />
        </div>
    );
}

export default ProductPage;
