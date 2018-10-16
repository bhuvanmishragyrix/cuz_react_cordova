import React from 'react';

import Login from '../components/Login/Login';
import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import * as appConstants from '../constants/AppConstants';

/**
 * <ul style="list-style: none;">
 *      <li> This is the Login Page. </li>
 *      <li> Functional Description:</li>
 *      <ul>
 *          <li> This page is a container for ThreeElementTabBar and our Login component, which resides in src/components/Login/Login.js </li>
 *          <li> Overall in the Login Page, the user can either press the Sign Up button present to Sign Up, or </li>
 *          <li> The user can enter his registered email Id and password to login into the application.  </li>
 *      </ul>
 *      <li> Code Description: </li>
 *      <ul>
 *          <li> In this page we render the ThreeElementTabBar, from (from src/components/ThreeElementTabBar/ThreeElementTabBar)</li>
 *          <li> We hide the Menu Icon and the Share Icon in the ThreeElementTabBar using "hideMenuIcon" and "hideShareIcon" props.</li>
 *          <li> Then we render the Login component from src/containers/Login/Login.js.</li>
 *          <li> We also place a top margin for the Login component so that is shows below the ThreeElementTabBar. </li>
 *      </ul>
 *      <li> Navigation Description: </li>
 *      <ul>
 *          <li> With correct credentials if we click on "Login" button, we are redirected to route '/parentForThreeElementTabBarScreens/categorySelectPage'.</li>
 *      </ul>
 * </ul>
 */
const loginPage = () => {

    let topMargin = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    return (
        <div>
            <ThreeElementTabBar hideMenuIcon={true} hideShareIcon={true} />
            <div style={topMargin}>
                <Login />
            </div>
        </div>
    );
};

export default loginPage;