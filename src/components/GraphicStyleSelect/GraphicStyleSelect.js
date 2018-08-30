import React from 'react';

import * as appConstants from '../../constants/AppConstants';
import styles from './GraphicStyleSelect.css';
import YourChoiceDisplay from './YourChoiceDisplay/YourChoiceDisplay';
import CustomizeIt from './CustomizeIt/CustomizeIt';
import Instructions from './InstructionsText/Instructions';

const graphicStyleSelect = () => {

    let topMarginGraphicStyleSelect = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    return (
        <div style={topMarginGraphicStyleSelect}>
            <div className={`${styles.borderAroundYourChoiceDisplay} px-3 pb-3 pt-2`}>
                <YourChoiceDisplay />
            </div>
            <CustomizeIt />
            <Instructions />
            <div className={`w-100 text-center my-3`}>
                <p className={`${styles.text}`}>SELECT A STYLE</p>
            </div>
        </div >
    );
};

export default graphicStyleSelect;