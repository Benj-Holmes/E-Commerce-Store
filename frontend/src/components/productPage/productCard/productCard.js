import React from 'react';
import {useNavigate} from 'react-router-dom';
import './productCard.css';


const ProductCard = (props) => {
    const navigate = useNavigate();
    const imgPath = `/productImages/${props.path}.jpg`;


    return (
        <div className='cardHolder' 
        onClick={()=>navigate(`/products/${props.id}`, {
            state: {
                name: props.name,
                price: props.price,
                description: props.description,
                path: props.path,
                id: props.id
            }
        })}>
            <img src={imgPath} alt=''></img>
            <div className='prodInfo'>
                <p className='prodName'>{props.name}</p>
                <p className='prodPrice'> {props.price} </p>
            </div>
        </div>
    );
}

export default ProductCard;
