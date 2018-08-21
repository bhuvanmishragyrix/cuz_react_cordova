import React, { Component } from 'react';

import logo from '../../assets/logo.png';
import './Home.css';
import * as AppConst from '../../constants/AppConstants';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

class Home extends Component {

    constructor(props) {
        super(props);

        const heightOfDivToSet = window.screen.height - AppConst.HeightToSubtractFromWindowScreenHeight;
        this.state = {
            heightOfDivToSet: heightOfDivToSet
        };
    }

    render() {
        return (
            <div>
                <div style={{ height: this.state.heightOfDivToSet }} className="d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        <img src={logo} />
                    </div>
                </div>
                <div className="start-icon text-center">
                    <i className="fa fa-play-circle" aria-hidden="true"></i>
                </div>
            </div>
        );
    }
};

export default Home;