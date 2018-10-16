import React from 'react';

import Login from '../components/Login/Login';
import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import * as appConstants from '../constants/AppConstants';

/**
 * <ul style="list-style: none;">
 * <li> In this file (function) we render the ThreeElementTabBar from src/components/ThreeElementTabBar/ThreeElementTabBar.js. </li>
 * <li> We hide the Menu Icon and the Share Icon in this component using "hideMenuIcon" and "hideShareIcon" props.</li>
 * <li> Then we render the Login component from src/containers/Login/Login.js.</li>
 * <li> We also place a top margin for the Login component so that is shows below the ThreeElementTabBar. </li>
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