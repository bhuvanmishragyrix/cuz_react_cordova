import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import CategorySelectPage from '../containers/CategorySelectPage';
import BrandYearModelSelectionPage from  './BrandYearModelSelectionPage';

const parentForThreeElementTabBarScreens = () => {
    return (
        <div>
            <ThreeElementTabBar />
            <Switch>
                <Route path="/parentForThreeElementTabBarScreens/categorySelectPage" component={CategorySelectPage} />
                <Route path="/parentForThreeElementTabBarScreens/brandYearModalSelectPage" component={BrandYearModelSelectionPage}/>
            </Switch>
        </div>
    );

};

export default parentForThreeElementTabBarScreens;