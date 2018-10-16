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
 * We place all the top most level routes inside a "Switch" on this page. Also if we do not direct to any route, LandingPage is rendered.
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