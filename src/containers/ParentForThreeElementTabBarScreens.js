import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ThreeElementTabBar from '../components/ThreeElementTabBar/ThreeElementTabBar';
import CategorySelectPage from '../containers/CategorySelectPage';

const parentForThreeElementTabBarScreens = () => {
    return (
        <div>
            <ThreeElementTabBar />
            <Switch>
                <Route path="/parentForThreeElementTabBarScreens/categorySelectPage" component={CategorySelectPage} />
            </Switch>
        </div>
    );

};

export default parentForThreeElementTabBarScreens;