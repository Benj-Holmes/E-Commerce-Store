import React from 'react';
import './mainPage.css';
import shoe1 from '../../imgs/productSpotlightImgs/prod1.jpg';
import shoe2 from '../../imgs/productSpotlightImgs/prod2.jpg';
import shoe3 from '../../imgs/productSpotlightImgs/prod3.jpg';
import shoe4 from '../../imgs/productSpotlightImgs/prod4.jpg';

const ProductSpotlight = () => {
    return (
        <div class='spotlight'>
            <div className='spotlightHeader'>
                <h3> A NEW RANGE OF TRAINERS - <span> COMING SOON </span> </h3>
            </div>
            <div className='spotlightContainer'>
                <div className='productSpotlight'>
                    <img src={shoe2} />
                    <div className="overlay">
                        <figcaption className='upperText'> Nike Air Force 1 '07 LV8 UT </figcaption>
                        <figcaption className='lowerText'> £115.00 </figcaption>
                    </div>
                </div>
                <div className='productSpotlight'>
                    <img src={shoe1} />
                    <div className="overlay">
                        <figcaption className='upperText'> Nike React Pegasus Trail 4 </figcaption>
                        <figcaption className='lowerText'> £145.00 </figcaption>
                    </div>
                </div>
                <div className='productSpotlight'>
                    <img src={shoe4} />
                    <div className="overlay">
                        <figcaption className='upperText'> Nike Downshifter 12 </figcaption>
                        <figcaption className='lowerText'> £60.00 </figcaption>
                    </div>
                </div>
                <div className='productSpotlight'>
                    <img src={shoe3} />
                    <div className="overlay">
                        <figcaption className='upperText'> Nike Air Max Alpha TR 4 </figcaption>
                        <figcaption className='lowerText'> £73.00 </figcaption>
                    </div>
                </div>
            </div>
            <div className='spotlightHeader'>
                <h4> SIGN UP TO THE MAILING LIST TO PRE-ORDER </h4>
            </div>





















        </div>
    );
}

export default ProductSpotlight;
