import React from 'react';

import styles from './BottomControls.css';

const bottomControls = (props) => {
    return (
        <div>
            <div className={`text-center`}>
                <div className={`d-flex justify-content-center align-items-center`}>
                    <i className={`fa fa-shopping-cart ${styles.cartIcon} d-inline-block p-0 m-0`} aria-hidden="true"></i>
                    <p className={`${styles.totalText} d-inline-block p-0 my-0 mx-1`}>Total</p>
                    <i className={`fa fa-eur ${styles.euroIcon} d-inline-block p-0 ml-0 my-0 mr-1`} aria-hidden="true"></i>
                    <p className={`${styles.priceText} d-inline-block p-0 my-0`}>{props.price /100}</p>
                </div>
                <i className={`fa fa-check-circle-o ${styles.checkoutIcon}`} aria-hidden="true"></i>
                <p className={`${styles.text}`}>CHECKOUT</p>
            </div>
        </div>
    );
}

export default bottomControls;