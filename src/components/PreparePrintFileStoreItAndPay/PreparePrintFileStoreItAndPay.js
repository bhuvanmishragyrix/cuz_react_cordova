import React, { Component } from 'react';

import * as appConstants from '../../constants/AppConstants';

class PreparePrintFileStoreItAndPay extends Component {

    topMargin = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    render() {
        return (
            <div style={this.topMargin}>
                Hello World
            </div>
        );
    }
}

export default PreparePrintFileStoreItAndPay;