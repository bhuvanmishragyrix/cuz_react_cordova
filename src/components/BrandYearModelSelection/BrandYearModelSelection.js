import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as appConstants from '../../constants/AppConstants';
import ContinueButton from '../UIComponents/ContinueButton/ContinueButton';
import Carousel from './Carousel/Carousel';
import styles from './BrandYearModelSelection.css';
import * as actionTypes from '../../store/actionTypes';

class BrandYearModelSelection extends Component {

    brandCarouselData;
    yearCarouselData;
    modelCarouselData;
    brandCarouselId = `brandCarousel`;
    yearCarouselId = `yearCarousel`;
    modelCarouselId = `modelCarousel`;
    brandSelectedIndex = 0;
    yearSelectedIndex = 0;
    modelSelectedIndex = 0;
    heightOfCarousel;

    /**
    * <ul style="list-style:none;">
    * <li> In the constructor we first try to populate the Brand, Year, and Model carousel data. </li>
    * <li> Then we set the initial value of some state variables. </li>
    * <li> We then set the height of the carousel in the class variable 'heightOfCarousel'. </li>
    * </ul>
    */
    constructor(props) {
        super(props);

        this.populatePropsForBrandYearModelCarousels(this.props);

        this.state = {
            topMarginBrandYearModelSelection: {
                marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + 30}px`
            },
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData,
            isContinueButtonDisabled: this.checkIfToDisableContinueButton(),
            onContinueButtonClick: this.checkIfToDisableContinueButton() ? () => { } : this.storeBrandYearModelInStoreAndNavigateToGraphicStyleSelectionPage
        };

        this.heightOfCarousel = (window.screen.height - appConstants.HEIGHT_TO_SUBTRACT_FROM_WINDOW_SCREEN_HEIGHT - appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR) / 4.8;
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we check if to disable the continue button on screen</li>
    * </ul>
    */
    checkIfToDisableContinueButton = () => {
        if (this.modelCarouselData && this.modelCarouselData.hasOwnProperty(this.modelSelectedIndex) && this.modelCarouselData[this.modelSelectedIndex].hasOwnProperty(`model`) && this.modelCarouselData[this.modelSelectedIndex].model) {
            return false;
        }
        else {
            return true;
        }
    };

    /**
    * <ul style="list-style:none;">
    * <li> In this function we save brand, year, and model value in store, and </li>
    * <li> Navigate to GraphicStyleSelectionPage (from src/containers/BrandYearModelSelection.js) </li>
    * </ul>
    */
    storeBrandYearModelInStoreAndNavigateToGraphicStyleSelectionPage = () => {
        this.props.storeSelectedBrandYearModelInStore(this.brandCarouselData[this.brandSelectedIndex].brand,
            this.yearCarouselData[this.yearSelectedIndex].year,
            this.modelCarouselData[this.modelSelectedIndex].model);
        this.props.history.push('/parentForThreeElementTabBarScreens/graphicStyleSelectPage');
    };

    /**
    * <ul style="list-style:none;">
    * <li> In this function we populate the Brand, Year, and Model carousel Data considering the case that this data wasn't available in store when the constructor ran, and arrived later. </li>
    * </ul>
    */
    componentWillReceiveProps(newProps) {
        this.populatePropsForBrandYearModelCarousels(newProps);

        this.setState({
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we set the values of Brand, Year, and Model carousel data in class variables. </li>
    * </ul>
    */
    populatePropsForBrandYearModelCarousels = (props) => {
        let brandSelected, yearSelected;
        if (props[`productsAndImagesData`]) {
            this.brandCarouselData = props.productsAndImagesData.filter((el) => {
                if (el.category && el.category === this.props.selectedCategory && el.brand && !el.year && !el.model) {
                    return el;
                }
            });

            brandSelected = this.brandCarouselData[this.brandSelectedIndex].brand;

            this.yearCarouselData = props.productsAndImagesData.filter((el) => {
                if (!el.category && !el.brand && el.year && !el.model) {
                    return el;
                }
            });

            yearSelected = this.yearCarouselData[this.yearSelectedIndex].year;

            this.modelCarouselData = props.productsAndImagesData.filter((el) => {
                if (el.category && el.brand && el.brand === brandSelected && el.year && el.year === yearSelected && el.model && !el.graphic) {
                    return el;
                }
            });
        }
    };

    /**
    * <ul style="list-style:none;">
    * <li> This function is executed when a brand is selected (or changed) in Brand Carousel. </li>
    * </ul>
    */
    brandSelected = (brandIndex) => {
        this.brandSelectedIndex = brandIndex;
        this.populatePropsForBrandYearModelCarousels(this.props);
        this.setState({
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData,
            isContinueButtonDisabled: this.checkIfToDisableContinueButton(),
            onContinueButtonClick: this.checkIfToDisableContinueButton() ? () => { } : this.storeBrandYearModelInStoreAndNavigateToGraphicStyleSelectionPage
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> This function is executed when a year is selected (or changed) in Year Carousel. </li>
    * </ul>
    */
    yearSelected = (yearIndex) => {
        this.yearSelectedIndex = yearIndex;
        this.populatePropsForBrandYearModelCarousels(this.props);
        this.setState({
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData,
            isContinueButtonDisabled: this.checkIfToDisableContinueButton(),
            onContinueButtonClick: this.checkIfToDisableContinueButton() ? () => { } : this.storeBrandYearModelInStoreAndNavigateToGraphicStyleSelectionPage
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> This function is executed when a model is selected (or changed) in Model Carousel. </li>
    * </ul>
    */
    modelSelected = (modelIndex) => {
        this.modelSelectedIndex = modelIndex;
        this.populatePropsForBrandYearModelCarousels(this.props);
        this.setState({
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData,
            isContinueButtonDisabled: this.checkIfToDisableContinueButton(),
            onContinueButtonClick: this.checkIfToDisableContinueButton() ? () => { } : this.storeBrandYearModelInStoreAndNavigateToGraphicStyleSelectionPage
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> This is the render function of our class. </li>
    * </ul>
    */
    render() {

        return (
            <div style={this.state.topMarginBrandYearModelSelection}>
                <div onClick={this.state.onContinueButtonClick}>
                    <ContinueButton isDisabled={this.state.isContinueButtonDisabled} />
                </div>
                <p className={`${styles.text} my-2`}>SELECT BRAND</p>
                <div className={styles.borderAroundCarousel}>
                    <Carousel heightOfCarousel={this.heightOfCarousel} categorySelected={this.brandSelected} carouselId={this.brandCarouselId} carouselData={this.state.brandCarouselData} />
                </div>
                <p className={`${styles.text} my-2`}>SELECT YEAR</p>
                <div className={styles.borderAroundCarousel}>
                    <Carousel heightOfCarousel={this.heightOfCarousel} categorySelected={this.yearSelected} carouselId={this.yearCarouselId} carouselData={this.state.yearCarouselData} />
                </div>
                <p className={`${styles.text} my-2`}>SELECT MODEL</p>
                <div className={`${styles.borderAroundCarousel} mb-2`}>
                    <Carousel heightOfCarousel={this.heightOfCarousel} categorySelected={this.modelSelected} carouselId={this.modelCarouselId} carouselData={this.state.modelCarouselData} />
                </div>
            </div>
        );
    }
}

/**
* <ul style="list-style:none;">
* <li> Here we map the store attributes to props in our class. </li>
* </ul>
*/
const mapStateToProps = (state) => {
    return {
        selectedCategory: state.selectedCategory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        /**
        * <ul style="list-style:none;">
        * <li> With the help of this function we save the selected Brand, Year and Model in store. </li>
        * </ul>
        */
        storeSelectedBrandYearModelInStore: (brand, year, model) => {
            dispatch({
                type: actionTypes.STORE_SELECTED_BRAND_YEAR_MODEL, payload: {
                    brand: brand,
                    year: year,
                    model: model
                }
            });
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrandYearModelSelection));