import React from 'react';
import './reviews.css';
import { useEffect } from 'react';
import ReviewCard from './reviewCard.js';
import { useDispatch,  useSelector } from 'react-redux'; 
import { getReviews, reviewSelector } from '../../../slices/productsSlice';

const Reviews = (props) => {
    const dispatch = useDispatch();
    const reviews = useSelector(reviewSelector);
    const id = props.id

    useEffect(() => {
    dispatch(getReviews(id))
    }   
    , [dispatch, id]);


    return (
        <div className='reviewContainer'>
            <div className="topbar">
                <h2> Customer Reviews </h2>
                <div className='tbar'></div>
            </div>
                <div className='reviewBox'>
                    { reviews != null ? reviews.map((review, index) => 
                    <ReviewCard key={index} title={review.title}
                    stars={review.star_rating} body={review.body}
                    />) : <p> No Reviews For This Product Yet </p>}
                </div>
            <div className="bbar"></div>
        </div>
    );
}

export default Reviews;
