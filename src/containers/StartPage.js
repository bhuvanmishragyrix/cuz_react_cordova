import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LandingPage from './LandingPage';
import ParentForThreeElementTabBarScreens from './ParentForThreeElementTabBarScreens';
import VisualComposerColorCustomiserPage from './VisualComposerColorCustomiserPage';
import PreviewPage from './PreviewPage';
import PaymentsPage from './PaymentsPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

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
                    <Route path="/payments" component={PaymentsPage} />
                    <Route render={LandingPage} />
                </Switch>
            </div>
        );
    }
};

export default withRouter(StartPage);