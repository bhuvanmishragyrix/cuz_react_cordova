import React from 'react';
import Styles from './ContinueButton.css';


const continueButton = () => {
    return (
        <div className={`w-100 d-flex justify-content-center align-items-center`}>
            <p className={`${Styles.text} mr-2`}>Continue</p>
            <i className={`fa fa-arrow-right ${Styles.nextIcon}`} aria-hidden="true"></i>
        </div>
    );
};

export default continueButton;