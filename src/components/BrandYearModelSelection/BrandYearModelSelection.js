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

    checkIfToDisableContinueButton = () => {
        if (this.modelCarouselData && this.modelCarouselData.hasOwnProperty(this.modelSelectedIndex) && this.modelCarouselData[this.modelSelectedIndex].hasOwnProperty(`model`) && this.modelCarouselData[this.modelSelectedIndex].model) {
            return false;
        }
        else {
            return true;
        }
    };

    storeBrandYearModelInStoreAndNavigateToGraphicStyleSelectionPage = () => {
        this.props.storeSelectedBrandYearModelInStore(this.brandCarouselData[this.brandSelectedIndex].model,
            this.yearCarouselData[this.yearSelectedIndex].year,
            this.modelCarouselData[this.modelSelectedIndex].model);
        this.props.history.push('/parentForThreeElementTabBarScreens/graphicStyleSelectPage');
    };

    componentWillReceiveProps(newProps) {
        this.populatePropsForBrandYearModelCarousels(newProps);

        this.setState({
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData
        });
    }

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

const mapStateToProps = (state) => {
    return {
        selectedCategory: state.selectedCategory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
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