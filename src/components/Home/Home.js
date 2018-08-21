import React, { Component } from 'react';

import logo from '../../assets/logo.png';
import './Home.css';
import * as AppConst from '../../constants/AppConstants';

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
            <div style={{ height: this.state.heightOfDivToSet }} className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <img src={logo} />
                </div>
            </div>
        );
    }
};

export default Home;