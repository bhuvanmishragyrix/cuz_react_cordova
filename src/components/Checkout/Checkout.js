import React from 'react';
import { connect } from 'react-redux';

import styles from './Checkout.css';
import Item from './Item/Item';
import BottomControls from './BottomControls/BottomControls';
import * as appConstants from '../../constants/AppConstants';
import { withRouter } from 'react-router-dom';

const checkout = (props) => {

    const topMargin = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we redirect to PreparePrintFileStoreItAndPayPage (from 'src/containers/PreparePrintFileStoreItAndPayPage.js') </li>
    * </ul>
    */
    const redirectToPreparePrintFileAndPayPage = () => {
        props.history.push('/preparePrintFileStoreItAndPay');
    }

    /**
    * <ul style="list-style:none;">
    * <li> This is the render function of our class. </li>
    * </ul>
    */
    return (
        <div style={topMargin}>
            <div className={`text-center`}>
                <p className={`${styles.text}`}>YOUR SHOPPING</p>
            </div>
            <Item imageFileName={props.selectedCategoryImageFileName} price={props.selectedGraphicPrice} description={props.selectedGraphicDescription} />

            <div className={`${styles.bottomControls} w-100`} onClick={redirectToPreparePrintFileAndPayPage}>
                <BottomControls price={props.selectedGraphicPrice} />
            </div>
        </div>
    );
};

    /**
    * <ul style="list-style:none;">
    * <li> Here we map the attributes in store to props in our class. </li>
    * </ul>
    */
const mapStateToProps = (state) => {
    return {
        selectedGraphicDescription: state.selectedGraphicDescription,
        selectedCategoryImageFileName: state.selectedCategoryImageFileName,
        selectedGraphicPrice: state.selectedGraphicPrice,
        userJWTToken: state.userJWTToken
    };
};

export default withRouter(connect(mapStateToProps)(checkout));