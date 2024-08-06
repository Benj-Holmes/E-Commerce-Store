import React from 'react';
import './productList.css';
import ProductCard from '../productCard/productCard';
import { useEffect } from 'react';
import { productsSelector, getProducts } from '../../../slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(productsSelector);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className='productList'>
            {products != null ? products.map((body, index) => <ProductCard key={index} 
            name={body.name} description={body.description} price={body.price} 
            path={body.picture_path} id={body.id} />) : '' }
        </div>
    );
}

export default ProductList;
