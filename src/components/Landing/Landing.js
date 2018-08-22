import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import logo from '../../assets/logo.png';
import LandingCss from './Landing.css';
import * as AppConst from '../../constants/AppConstants';
import '../../../node_modules/font-awesome/css/font-awesome.min.css?raw';

class Home extends Component {

    heightOfDivToSet;

    constructor(props) {
        super(props);

        this.heightOfDivToSet = window.screen.height - AppConst.HeightToSubtractFromWindowScreenHeight;
    }

    redirectToParentForThreeElementTabBarScreens = () => {
        this.props.history.replace('/parentForThreeElementTabBarScreens/categorySelect');
    };

    render() {
        return (
            <div>
                <div style={{ height: this.heightOfDivToSet }} className="d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <img src={logo} />
                    </div>
                </div>
                <div onClick={this.redirectToParentForThreeElementTabBarScreens} className={`${LandingCss.startIcon} text-center`}>
                    <i className={`${LandingCss.iconSize} fa fa-play-circle`} aria-hidden="true"></i>
                </div>
            </div>
        );
    }
};

export default withRouter(Home);