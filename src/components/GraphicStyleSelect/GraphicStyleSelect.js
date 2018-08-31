import React from 'react';

import * as appConstants from '../../constants/AppConstants';
import styles from './GraphicStyleSelect.css';
import YourChoiceDisplay from './YourChoiceDisplay/YourChoiceDisplay';
import CustomizeIt from './CustomizeIt/CustomizeIt';
import Instructions from './InstructionsText/Instructions';
import ListOfGraphics from './ListOfGraphics/ListOfGraphics';
import { connect } from 'react-redux';

const graphicStyleSelect = (props) => {

    let imageNameData;

    imageNameData = props.images.filter((el) => {
        if (el.graphic && el.category === props.selectedCategory && el.brand === props.selectedBrand && el.year === props.selectedYear && el.model === props.selectedModel && !el.isBikeSVG) {
            return el;
        }
    });


    let topMarginGraphicStyleSelect = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    return (
        <div style={topMarginGraphicStyleSelect}>
            <div className={`${styles.borderAroundYourChoiceDisplay} px-3 pb-3 pt-2`}>
                <YourChoiceDisplay />
            </div>
            <div className={`mt-2`}>
                <CustomizeIt />
            </div>
            <Instructions />
            <div className={`w-100 text-center mt-2 mb-3`}>
                <p className={`${styles.text}`}>SELECT A STYLE</p>
            </div>
            <ListOfGraphics imageNameData={imageNameData} />
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        images: state.images,
        selectedCategory: state.selectedCategory,
        selectedBrand: state.selectedBrand,
        selectedYear: state.selectedYear,
        selectedModel: state.selectedModel,

    };
};

export default connect(mapStateToProps)(graphicStyleSelect);