import React from 'react';
import './productPic.css';

const ProductPic = (props) => {
    return (
        <div className='picContainer'>
            <img src={`/productImages/${props.path}.jpg`} alt=''></img>
        </div>
    );
}

export default ProductPic;