import React from 'react';

import * as appConstants from '../../constants/AppConstants';
import styles from './GraphicStyleSelect.css';
import YourChoiceDisplay from './YourChoiceDisplay/YourChoiceDisplay';
import CustomizeIt from './CustomizeIt/CustomizeIt';
import Instructions from './InstructionsText/Instructions';
import ListOfGraphics from './ListOfGraphics/ListOfGraphics';
import { connect } from 'react-redux';
import SelectAStyle from './SelectAStyle/SelectAStyle';
import * as actionTypes from '../../store/actionTypes';
import { withRouter } from 'react-router-dom';

const graphicStyleSelect = (props) => {

    let imageNameData;

    imageNameData = props.images.filter((el) => {
        if (el.graphic && el.category === props.selectedCategory && el.brand === props.selectedBrand && el.year === props.selectedYear && el.model === props.selectedModel && !el.isBikeSVG && !el.part) {
            return el;
        }
    });


    let topMarginGraphicStyleSelect = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    const onGraphicSelect = (index) => {
        props.storeSelectedGraphicAndPriceInStore(imageNameData[index].graphic, imageNameData[index].price);
        props.history.push('/visualComposerColorCustomiser');
    };


    return (
        <div style={topMarginGraphicStyleSelect}>
            <div className={`${styles.borderAroundYourChoiceDisplay} px-3 pb-3 pt-2`}>
                <YourChoiceDisplay />
            </div>
            <div className={`mt-2`}>
                <CustomizeIt />
            </div>
            <Instructions />
            <SelectAStyle />
            <ListOfGraphics imageNameData={imageNameData} onGraphicSelect={onGraphicSelect} />
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

const mapDispatchToProps = (dispatch) => {
    return {
        storeSelectedGraphicAndPriceInStore: (graphic, graphicPrice) => {
            dispatch({
                type: actionTypes.STORE_GRAPHIC_NAME_AND_PRICE, payload: {
                    selectedGraphic: graphic,
                    selectedGraphicPrice: graphicPrice
                }
            })
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(graphicStyleSelect));