import React from 'react';

import * as appConstants from '../../constants/AppConstants';

const graphicStyleSelect = () => {

    let topMarginGraphicStyleSelect = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    return (
        <div style={topMarginGraphicStyleSelect}>
            Hello World!
        </div>
    );
};

export default graphicStyleSelect;