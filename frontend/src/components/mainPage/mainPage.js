import React from 'react';
import './mainPage.css';
import SeasonalDisplay from './seasonalDisplay';
import ProductSpotlight from './productSpotlight';

const MainPage = () => {
    return (
        <div className='mainBody'>
           <SeasonalDisplay />
           <ProductSpotlight />
           <div className='logoDisplay'>
           <div className='logoHolder'> 
                    <img src={'/logos/l1.png'} alt='Hugo Boss Logo' />
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l3.png'} alt='Calvin Klein Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l4.png'} alt='New Era Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l5.png'} alt='Levis Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l6.png'} alt='Tommy Jeans Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l7.png'} alt='NAPAPAJIRI Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l8.png'} alt='Barbour Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l9.png'} alt='Lacoste Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l10.png'} alt='Ugg Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l2.png'} alt='Jack Wills Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l11.png'} alt='Lyle and Scott Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l12.png'} alt='Polo by Ralph Lauren Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l13.png'} alt='Converse Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l14.png'} alt='Timberland Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l15.png'} alt='Diesel Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l16.png'} alt='DKNY Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l17.png'} alt='Kangol Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l18.png'} alt='New Balance Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l19.png'} alt='Asics Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l20.png'} alt='Emporio Armani Logo'/>
                </div>
                <div className='logoHolder'> 
                    <img src={'/logos/l21.png'} alt='SuperDry Logo'/>
                </div>
           </div>
        </div>
    );
}

export default MainPage;
