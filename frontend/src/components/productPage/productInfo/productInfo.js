import React from 'react';
import './productInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateChosenSize, chosenProductSelector } from '../../../slices/productsSlice';
import { userSelector } from '../../../slices/authSlice';
import { useEffect } from 'react';
import { getCartItems, addItemToCart, cartMsgSelector, clearCartMsg, addToTempCart, cartItemSelector, setCartMsg} from '../../../slices/cartSlice';
import { getUser } from '../../../slices/authSlice';

const ProductInfo = (props) => {
    const dispatch = useDispatch();
    const chosenProduct = useSelector(chosenProductSelector);
    const cartMsg = useSelector(cartMsgSelector);
    const cartItems = useSelector(cartItemSelector);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const clearMsg = () => {
        dispatch(clearCartMsg());
    }
    
    const user = useSelector(userSelector);
    
    const handleAddToCart = () => {
        if (user) {
            // Checks to see if the product is already present in the cart, and if so, doesn't add it.
            if(!cartItems.filter((e) => e.name === chosenProduct.name).length > 0) {
                const prodData = {
                    product_id: chosenProduct.id,
                    quantity: chosenProduct.quantity,
                    item_size: chosenProduct.size
                }
                dispatch(addItemToCart(prodData))
                .then(() => dispatch(getCartItems()))
                .then(setTimeout(clearMsg , 5000));
            } else {
                dispatch(setCartMsg('This Item was Already found in Your Cart and was not Added Again'))
                setTimeout(clearMsg, 5000)
            }
        } else {
            dispatch(addToTempCart(chosenProduct))
            setTimeout(clearMsg, 5000)
        }
    }

    return (
        <div className='prodBox'>
        <div className='nameContainer'>
            <h1> {props.name} </h1>
            <h2 className='productPrice'> {props.price} </h2>
        </div>
        <div className="dropdownContainer">
                <select name="Size" id="size" onChange={(e) => dispatch(updateChosenSize(e.target.value))}>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Xtra Large">Xtra Large</option>
                </select>
                <button onClick={handleAddToCart}> Add to Cart </button>
        </div>
        <div className="spacer">
        </div>
        <div className='spacer'>
        </div>
        <div className='spacer'>
        </div>
        { cartMsg === 'Item was Successfully Added to Your Cart' ? 
            <div className='cartMessages'> 
                <p> Item was Successfully Added to Your Cart </p> 
                </div>: ''}
        { cartMsg === 'This Item was Already found in Your Cart and was not Added Again' ? 
            <div className='cartMessages'> 
                <p> This Item was Already found in Your Cart and was not Added Again </p> 
            </div> : ''}
        <div className="prodDescription">
            <p>
                 {props.description}
            </p>
        </div>
        </div>
    );
}

export default ProductInfo;
