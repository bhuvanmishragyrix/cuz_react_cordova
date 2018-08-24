import React from 'react';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import ThreeElementTabBarStyles from './ThreeElementTabBar.css';
import logo from '../../assets/logo.png';
import $ from 'jquery';
import * as appConstants from '../../constants/AppConstants';

const threeElementTabBar = () => {

    // console.log($(`.threeElementTabBarRoot`)[0].outerHTML);
    
    return (
        <div className="threeElementTabBarRoot p-3 d-flex align-items-center justify-content-center">
            <i style={{ fontSize: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR}px` }} className={`${ThreeElementTabBarStyles.tabBarIconColor} ${ThreeElementTabBarStyles.hamburgerMenu} fa fa-bars`} aria-hidden="true"></i>
            <img src={logo} style={{ height: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR}px` }} />
            <i style={{ fontSize: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR}px` }} className={`${ThreeElementTabBarStyles.tabBarIconColor} ${ThreeElementTabBarStyles.shareMenu} fa fa-share-alt`} aria-hidden="true"></i>
        </div>
    );

};

export default threeElementTabBar;