import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import CategorySelectPage from '../containers/CategorySelectPage';
import BrandYearModelSelectionPage from  './BrandYearModelSelectionPage';
import graphicStyleSelectPage from  './GraphicStyleSelectionPage';


/**
 * <ul style="list-style:none;">
 * <li> This is the common parent for Category selection page, Brand-Year-Model selection page, and graphic style selection page. </li>
 * <li> We have this common page in order to have a common header (ThreeElementTabBar), that we dont have to repeat in different pages. </li>
 * </ul>
 */
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