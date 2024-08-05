import React, {useState, useEffect} from 'react';
import './mainPage.css'

const SeasonalDisplay = () => {
    const [imgNo, setImgNo] = useState(1);
    const imgSrc = `/display/${imgNo}.jpg`;

    useEffect(() => {
        const updateImg = () => {
            setImgNo(prevImgNo => {
              if (prevImgNo === 1) return 2;
              if (prevImgNo === 2) return 3;
              return 1; 
            });
        }
        const setIntervalImg = setInterval(updateImg, 8000);
        return () => clearInterval(setIntervalImg);    

    }, []);

    return (
        <div className='seasonalDisplay'>
            <h1> Shop Our New Seasonal Ranges </h1>
            <img src={imgSrc} className='background' alt='A Seasonal Clothing Display' />
        </div>
    );
}

export default SeasonalDisplay;
