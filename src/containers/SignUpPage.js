import React from 'react';


import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import * as appConstants from '../constants/AppConstants';
import SignUp from '../components/SignUp/SignUp';


/**
 * <ul style="list-style: none;">
 *      <li> This is the Sign Up Page. </li>
 *      <li> Functional Description:</li>
 *      <ul>
 *          <li> This page is a container for ThreeElementTabBar and our Sign Up component, which resides in src/components/SignUp/SignUp.js </li>
 *          <li> Overall in Sign Up page the user can enter an email Id and password to register it with the application, or  </li>
 *          <li> The user can either press the Login button present on this page to Login. </li>
 *      </ul>
 *      <li> Code Description: </li>
 *      <ul>
 *          <li> In this page we render the ThreeElementTabBar, from (from src/components/ThreeElementTabBar/ThreeElementTabBar.js)</li>
 *          <li> We hide the Menu Icon and the Share Icon in the ThreeElementTabBar using "hideMenuIcon" and "hideShareIcon" props.</li>
 *          <li> Then we render the Login component from src/components/Login/Login.js.</li>
 *          <li> We also place a top margin for the Login component so that is shows below the ThreeElementTabBar. </li>
 *      </ul>
 *      <li> Navigation Description: </li>
 *      <ul>
 *          <li> Upon performing a succesful sign up we are presented with a "Login" button, which when tapped redirects to LoginPage (from src/containers/LoginPage.js).</li>
 *      </ul>
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