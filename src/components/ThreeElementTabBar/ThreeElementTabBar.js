import React, { Component } from 'react';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import ThreeElementTabBarStyles from './ThreeElementTabBar.css';
import logo from '../../assets/logo.png';
import $ from 'jquery';

class threeElementTabBar extends Component {

    logoHeight;

    constructor(props) {
        super(props);
        this.state = {
            logo: ""
        };
    }

    componentDidMount() {
        this.logoHeight = $(`.${ThreeElementTabBarStyles.tabBarIconSizeAndColor}`).height();
        this.setState({
            logo: <img src={logo} style={{ height: `${this.logoHeight}px` }} />
        });

        //Code to convert html to string
        console.log($(`.threeElementTabBarRoot`)[0].outerHTML);
    }

    render() {
        return (
            <div className="threeElementTabBarRoot p-3 d-flex align-items-center justify-content-center">
                <i className={`${ThreeElementTabBarStyles.tabBarIconSizeAndColor} ${ThreeElementTabBarStyles.hamburgerMenu} fa fa-bars`} aria-hidden="true"></i>
                {this.state.logo}
                <i className={`${ThreeElementTabBarStyles.tabBarIconSizeAndColor} ${ThreeElementTabBarStyles.shareMenu} fa fa-share-alt`} aria-hidden="true"></i>
            </div>
        );
    }


};

export default threeElementTabBar;