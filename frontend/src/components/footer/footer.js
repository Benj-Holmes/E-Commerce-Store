import React from 'react';
import './footer.css';
import github from './github.png';

const Footer = () => {
    return (
        <div className='footerContainer'>
            <div className='footDiv'>
                <ul>
                    <li className='listTitle'> Visit Us:</li>
                    <li> 123 Fake Street </li>
                    <li> Nowhereville  </li>
                    <li> AA10 1AB </li>
                </ul>
            </div>
            <div className='footDiv'>
                <ul>
                    <li className='listTitle'> Contact Us: </li>
                    <li> Sales@OneBillionClothing.co.uk </li>
                    <li> Accounts@OneBillionClothing.co.uk </li>
                    <li> 029 2064 9200 </li>
                </ul>
            </div>
            <div className='footDiv'>
            </div>
            <div className='github'>
                <a href='https://github.com/Benj-Holmes/E-Commerce-Store' target='_blank'>
                    <p className='githubText'> Visit this Project on Github! </p>
                    <img src={github} alt='Link to this Projects Github Repository' />
                </a>
            </div>
        </div>
    );
}

export default Footer;
