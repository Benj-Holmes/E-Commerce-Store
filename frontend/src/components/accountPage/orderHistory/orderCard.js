import React from 'react';
import './orderHistory.css';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { chosenOrderSelector, setChosenOrder } from '../../../slices/accountPageSlice';
import OrderDetails from './orderDetails.js';

const OrderCard = (props) => {
    const dispatch = useDispatch();
    const chosenOrderId = useSelector(chosenOrderSelector);
    return (
        <div>
        <div className='order'>
            <p> 00000000{props.order_id} </p>
            <p> {props.date.slice(0, 10)} </p>
            <p> </p>
            <p className='orderBtn' onClick={() => dispatch(setChosenOrder(props.order_id))}> + </p>
        </div>
            <AnimatePresence>
                { chosenOrderId === props.order_id ? 
                    <OrderDetails order_id={props.order_id} />
                : '' }
            </AnimatePresence>    
        </div>
    );
}

export default OrderCard;
