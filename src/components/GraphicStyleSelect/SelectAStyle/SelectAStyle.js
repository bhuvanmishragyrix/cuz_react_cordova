import React from 'react';
import dropIcon from '../../../assets/icons/icon-cuz.svg';
import styles from './SelectAStyle.css';


const selectAStyle = () => {

    let widthOfDropIcon = {
        width: 0.08 * window.screen.width
    };

    return (
        <div className={`w-100 d-flex justify-content-center pt-2`}>
            <img className={`d-inline-block ${styles.fixedLeft}`} style={widthOfDropIcon} src={dropIcon} />
            <div className={`d-inline-block mt-2 mb-3`}>
                <p className={`${styles.text}`}>SELECT A STYLE</p>
            </div>
        </div>
    );
};

export default selectAStyle;