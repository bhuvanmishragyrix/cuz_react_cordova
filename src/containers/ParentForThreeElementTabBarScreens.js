import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import CategorySelectPage from '../containers/CategorySelectPage';
import BrandYearModelSelectionPage from  './BrandYearModelSelectionPage';
import graphicStyleSelectPage from  './GraphicStyleSelectionPage';

const parentForThreeElementTabBarScreens = () => {
    return (
        <div>
            <ThreeElementTabBar hideMenuIcon={true} hideShareIcon={true}/>
            <Switch>
                <Route path="/parentForThreeElementTabBarScreens/categorySelectPage" component={CategorySelectPage} />
                <Route path="/parentForThreeElementTabBarScreens/brandYearModalSelectPage" component={BrandYearModelSelectionPage}/>
                <Route path="/parentForThreeElementTabBarScreens/graphicStyleSelectPage" component={graphicStyleSelectPage}/>
            </Switch>
        </div>
    );

};

export default parentForThreeElementTabBarScreens;