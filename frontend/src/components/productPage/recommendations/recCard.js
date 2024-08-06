import React from 'react';
import './recommendations.css';

const RecCard = (props) => {
    const imgPath = `/productImages/${props.path}.jpg`;
    return (
        <div className='cardHolder' 
        onClick={() => props.setProduct({
            name: props.name,
            price: props.price,
            description: props.description,
            path: props.path,
            id: props.id
        })}>
            <img src={imgPath} alt=''></img>
            <div className='prodInfo'>
                <p className='prodName'>{props.name}</p>
                <p className='prodPrice'> {props.price} </p>
            </div>
        </div>
    );
    
}

export default RecCard;
