import React from 'react';
import { connect } from 'react-redux';

import styles from './Payments.css';
import Item from './Item/Item';
import BottomControls from './BottomControls/BottomControls';

import * as appConstants from '../../constants/AppConstants';
import * as AWSServicesManagement from '../../util/AWSServicesManagement';

const payments = (props) => {

    const topMarginPaymentsPage = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    AWSServicesManagement.getSVGImageFromS3(props.userJWTToken, 'print.svg');

    return (
        <div style={topMarginPaymentsPage}>
            <div className={`text-center`}>
                <p className={`${styles.text}`}>YOUR SHOPPING</p>
            </div>
            <Item imageFileName={props.selectedCategoryImageFileName} price={props.selectedGraphicPrice} description={props.selectedGraphicDescription} />

            <div className={`${styles.bottomControls} w-100`}>
                <BottomControls price={props.selectedGraphicPrice} />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedGraphicDescription: state.selectedGraphicDescription,
        selectedCategoryImageFileName: state.selectedCategoryImageFileName,
        selectedGraphicPrice: state.selectedGraphicPrice,
        userJWTToken: state.userJWTToken
    };
};

export default connect(mapStateToProps)(payments);