import React from 'react';


import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import * as appConstants from '../constants/AppConstants';
import SignUp from '../components/SignUp/SignUp';


/**
 * <ul style="list-style:none;">
 * <li>In this page we first render ThreeElementTabBar component from src/components/ThreeElementTabBar/ThreeElementTabBar.js </li>
 * <li> We hide the Menu Icon and Share Icon using props. </li>
 * <li> We then render the SignUp component from src/components/SignUp/SignUp.js. </li>
 * <li> We also place a top margin for the SignUp component so that is shows below the ThreeElementTabBar. </li>
 * </ul>
 */
const signUpPage = () => {

    let topMargin = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    return (
        <div>
            <ThreeElementTabBar hideMenuIcon={true} hideShareIcon={true} />
            <div style={topMargin}>
                <SignUp />
            </div>
        </div>
    );
};

export default signUpPage;