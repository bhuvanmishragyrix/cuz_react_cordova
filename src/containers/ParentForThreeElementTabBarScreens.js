import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import CategorySelectPage from '../containers/CategorySelectPage';
import BrandYearModelSelectionPage from  './BrandYearModelSelectionPage';
import graphicStyleSelectPage from  './GraphicStyleSelectionPage';


/**
 * <ul style="list-style:none;">
 *      <li> Functional Description: </li>
 *      <ul>
 *          <li> This is the common parent for Category selection page, Brand-Year-Model selection page, and graphic style selection page. </li>
 *          <li> We have this common page in order to have a common header (ThreeElementTabBar), that we dont have to repeat in different pages. </li>
 *      </ul>
 *      <li> Code Description: </li>
 *      <ul>
 *          <li> We render ThreeElementTabBar component (from /src/components/ThreeElementTabBar/ThreeElementTabBar). </li>
 *          <li> We hide the Menu Icon and the Share Icon using props.</li>
 *          <li> Then we have routes for CategorySelectPage (from src/containers/CategorySelectPage), BrandYearModelSelectionPage (from src/containers/BrandYearModelSelectionPage), graphicStyleSelectPage (from src/containers/graphicStyleSelectPage). </li>
 *      </ul>
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