import React from 'react';

import styles from './CustomizeIt.css';
import dropIcon from '../../../assets/icons/icon-cuz.svg';

const customizeIt = () => {

    const widthOfScreen = window.screen.width;

    return (
        <div className={`d-flex align-items-center justify-content-center`}>
            <img style={{ width: 0.065 * widthOfScreen }} src={dropIcon} />
            <p className={`${styles.text} d-inline-block py-0 my-0 ml-2`}>CUSTOMIZE IT</p>
        </div>
    );
};

export default customizeIt;