import React from 'react';
import StarRatings from 'react-star-ratings';
import './reviews.css';

const ReviewCard = (props) => {
    
    return (
        <div>
            
            <div className="review">
                    <h3> {props.title} </h3>
                    <StarRatings 
                        rating={props.stars}
                        numberOfStars={5}
                        starRatedColor='yellow'
                        starEmptyColor='black'
                        starDimension='20px'
                        starSpacing='1px'
                    />
                    <p> {props.body} </p> 
            </div>
           
        </div>
    );
}

export default ReviewCard;