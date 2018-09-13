import React from 'react';

import * as appConstants from '../../constants/AppConstants';

const payments = () => {

    const topMarginPaymentsPage = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    return (
        <div style={topMarginPaymentsPage}>
            Hello World!
        </div>
    );
};

export default payments;