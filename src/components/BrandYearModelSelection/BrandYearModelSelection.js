import React, { Component } from 'react';

import * as appConstants from '../../constants/AppConstants';
import ContinueButton from './ContinueButton/ContinueButton';

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
                <ContinueButton />
            </div>
        );
    }
}

export default BrandYearModelSelection;