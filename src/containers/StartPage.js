import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LandingPage from './LandingPage';
import ParentForThreeElementTabBarScreens from './ParentForThreeElementTabBarScreens';
import VisualComposerColorCustomiserPage from './VisualComposerColorCustomiserPage';
import { getFromAPI } from '../util/Util';
import { LINK_TO_FETCH_JSON_DATA_FROM } from '../constants/AppConstants';
import { STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA } from '../store/actionTypes';
import PreviewPage from './PreviewPage';
import PaymentsPage from './PaymentsPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

class StartPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        getFromAPI(LINK_TO_FETCH_JSON_DATA_FROM)
            .then((data) => {
                this.props.storeProductsAndImagesJSONData(data.data);
            })
            .catch((err) => { console.log("Error", err) });
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signUp" component={SignUpPage}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        storeProductsAndImagesJSONData: (data) => {
            dispatch({ type: STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA, payload: data })
        }
    };
};

export default withRouter(connect(null, mapDispatchToProps)(StartPage));