import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LandingPage from './LandingPage';
import ParentForThreeElementTabBarScreens from './ParentForThreeElementTabBarScreens';
import VisualComposerColorCustomiserPage from './VisualComposerColorCustomiserPage';
import PreviewPage from './PreviewPage';
import CheckoutPage from './CheckoutPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PreparePrintFileStoreItAndPayPage from './PreparePrintFileStoreItAndPayPage';

/**
 * <ul> 
 *      <li> This is the Start Page. </li>
 *      <li> Functional Description: </li>
 *      <ul>
 *          <li> This page is just a container. It renders the appropriate route. </li>
 *          <li> Also if we do not direct to any route, LandingPage is rendered, which is the first page to be rendered when the app starts. </li>
 *      </ul>
 *      <li> Code Description: </li>
 *      <ul>
 *          <li> We place all the top most level routes inside a "Switch" on this page. </li>
 *      </ul>
 *      <li> Navigation Description: </li>
 *      <ul>
 *          <li> If we do not direct to any route, we are navigated to LandingPage (from src/containers/LandingPage)</li>
 *      </ul>
 * </ul>
 */
class StartPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signUp" component={SignUpPage} />
                    <Route path="/parentForThreeElementTabBarScreens" component={ParentForThreeElementTabBarScreens} />
                    <Route path="/visualComposerColorCustomiser" component={VisualComposerColorCustomiserPage} />
                    <Route path="/preview" component={PreviewPage} />
                    <Route path="/checkout" component={CheckoutPage} />
                    <Route path="/preparePrintFileStoreItAndPay" component={PreparePrintFileStoreItAndPayPage}/>
                    <Route render={LandingPage} />
                </Switch>
            </div>
        );
    }
};

export default withRouter(StartPage);