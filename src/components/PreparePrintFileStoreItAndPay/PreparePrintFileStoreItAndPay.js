import React, { Component } from 'react';

import * as appConstants from '../../constants/AppConstants';
import * as util from '../../util/Util';

class PreparePrintFileStoreItAndPay extends Component {

    topMargin = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    constructor(props) {

        super(props);

        this.state = {
            content: util.circularProgress()
        };
    }

    render() {
        return (
            <div style={this.topMargin}>
                {this.state.content}
            </div>
        );
    }
}

export default PreparePrintFileStoreItAndPay;