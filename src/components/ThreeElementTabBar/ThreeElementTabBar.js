import React from 'react';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import ThreeElementTabBarStyles from './ThreeElementTabBar.css';

const threeElementTabBar = () => {
    return (
        <div>
            <i className={`${ThreeElementTabBarStyles.tabBarIconSize} fa fa-bars`} aria-hidden="true"></i>
        </div>
    );
};

export default threeElementTabBar;