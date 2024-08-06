import React from 'react';
import { useDispatch } from 'react-redux';
import { setProdIdForDeletion, 
    deleteItemFromCart, 
    getCartItems,
    updateCartQuantity,
} from '../../slices/cartSlice';

const CheckoutItem = (props) => {
const dispatch = useDispatch();
const imgPath = `/productImages/${props.pic_path}.jpg`;

const handleDelete = () => {
    dispatch(setProdIdForDeletion(props.product_id));
    dispatch(deleteItemFromCart(props.product_id)).then(() => dispatch(getCartItems()));
}

let totalPrice = props.price * props.quantity;

const handleQuantity = (direction) => {
    if (direction === 'up') {
        const data = {
            cart_id: props.cart_id,
            product_id: props.product_id,
            quantity: props.quantity + 1
        }
        dispatch(updateCartQuantity(data)).then(() => dispatch(getCartItems()));
    } else if (direction === 'down') {
        if (props.quantity === 1) {
            handleDelete();
        } else {
            const data = {
                cart_id: props.cart_id,
                product_id: props.product_id,
                quantity: props.quantity - 1  
            }
            dispatch(updateCartQuantity(data)).then(() => dispatch(getCartItems()));
        }
    }
}

return (
    <div className='checkoutItem'>
        <img src={imgPath} alt=''></img>
        <h4> {props.name} </h4>
        <div className='qtyContainer'>
        <p onClick={() => handleQuantity('down')}> - </p>
            <h5> Quantity: {props.quantity} </h5>
        <p onClick={() => handleQuantity('up')}> + </p>
        </div>
        <div className="productInfo">
        <h5> Price: £ {totalPrice} </h5>
        <h5> Size : {props.item_size} </h5>
        </div>
        <p onClick={handleDelete} className='removeText' > Remove Item </p>
    </div>
);
        
}

export default CheckoutItem;
