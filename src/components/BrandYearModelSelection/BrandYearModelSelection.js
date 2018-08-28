import React, { Component } from 'react';

import * as appConstants from '../../constants/AppConstants';
import Styles from './BrandYearModelSelection.css';

class BrandYearModelSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topMarginBrandYearModelSelection: {
                marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + 30}px`
            }
        };
    }

    render() {
        return (
            <div style={this.state.topMarginBrandYearModelSelection}>
                <div className={`w-100`}>
                <i className={`fa fa-arrow-right ${Styles.nextIcon} float-right`} aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

export default BrandYearModelSelection;