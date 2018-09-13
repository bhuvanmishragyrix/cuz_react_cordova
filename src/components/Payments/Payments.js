import React from 'react';

import styles from './Payments.css';
import Item from './Item/Item';
import BottomControls from './BottomControls/BottomControls';

import * as appConstants from '../../constants/AppConstants';

const payments = () => {

    const topMarginPaymentsPage = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    return (
        <div style={topMarginPaymentsPage}>
            <div className={`text-center`}>
                <p className={`${styles.text}`}>YOUR SHOPPING</p>
            </div>
            <Item />

            <div className={`${styles.bottomControls} w-100`}>
                <BottomControls />
            </div>
        </div>
    );
};

export default payments;