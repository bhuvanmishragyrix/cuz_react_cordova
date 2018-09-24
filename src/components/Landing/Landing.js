import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import logo from '../../assets/logo.png';
import LandingCss from './Landing.css';
import * as AppConst from '../../constants/AppConstants';
import '../../../node_modules/font-awesome/css/font-awesome.min.css?raw';

class Landing extends Component {

    heightOfDivToSet;

    constructor(props) {
        super(props);

        this.heightOfDivToSet = 0.9 * window.screen.height - AppConst.HEIGHT_TO_SUBTRACT_FROM_WINDOW_SCREEN_HEIGHT;
    }

    redirectToParentForThreeElementTabBarScreens = () => {
        // this.props.history.replace('/parentForThreeElementTabBarScreens/categorySelectPage');
        this.props.history.replace('/login');
    };

    render() {
        return (
            <div>
                <div style={{ height: this.heightOfDivToSet }} className="d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <img className={LandingCss.imageSize} src={logo} />
                    </div>
                </div>
                <div onClick={this.redirectToParentForThreeElementTabBarScreens} className={`${LandingCss.startIconAndText} text-center`}>
                    <i className={`${LandingCss.iconSizeAndColor} fa fa-play-circle`} aria-hidden="true"></i>
                    <p className={LandingCss.startTextAndColor}>START</p>
                </div>
            </div>
        );
    }
};

export default withRouter(Landing);