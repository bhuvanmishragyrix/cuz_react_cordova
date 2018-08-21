import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage';
import ParentForThreeElementTabBarScreens from './ParentForThreeElementTabBarScreens';

const StartPage = () => {
    return (
        <div>
            <Switch>
                <Route path="/parentForThreeElementTabBarScreens" component={ParentForThreeElementTabBarScreens}/>
                <Route render={LandingPage} />
            </Switch>
        </div>
    );
};

export default StartPage;