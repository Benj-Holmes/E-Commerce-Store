import React from 'react';
import ProductPic from './productPic/productPic.js';
import ProductInfo from './productInfo/productInfo.js';
import Recommendations from './recommendations/recommendations.js';
import Reviews from './reviews/reviews.js';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setChosenProduct } from '../../slices/productsSlice.js';
import { useDispatch } from 'react-redux';



const Product = () => {
    const location = useLocation();
    const [product, setProduct] = useState(location.state);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setChosenProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            pic_path: product.path
        }));
    }, [dispatch, product]);

    return (
        <div>
            <div className='prodContainer'>
                <ProductPic path={product.path}/>
                <ProductInfo name={product.name} price={product.price} description={product.description} />    
            </div>
            <Reviews id={product.id}/>
            <Recommendations setProduct={setProduct} />
        </div>
    );
}
export default Product;
