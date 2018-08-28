import React, { Component } from 'react';

import * as appConstants from '../../constants/AppConstants';
import ContinueButton from './ContinueButton/ContinueButton';
import Carousel from './Carousel/Carousel';

class BrandYearModelSelection extends Component {

    brandCarouselData;
    yearCarouselData;
    modelCarouselData;

    constructor(props) {
        super(props);

        this.populatePropsForBrandYearModelCarousels(this.props);

        this.state = {
            topMarginBrandYearModelSelection: {
                marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + 30}px`
            },
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData
        };
    }

    componentWillReceiveProps(newProps) {
        this.populatePropsForBrandYearModelCarousels(newProps);

        this.setState({
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData
        });
    }

    populatePropsForBrandYearModelCarousels = (props) => {

        if (props[`productsAndImagesData`]) {
            this.brandCarouselData = props.productsAndImagesData.filter((el) => {
                if (el.category && el.brand && !el.year && !el.model) {
                    return el;
                }
            });
            this.yearCarouselData = props.productsAndImagesData.filter((el) => {
                if (el.category && !el.brand && el.year && !el.model) {
                    return el;
                }
            });
            this.modelCarouselData = props.productsAndImagesData.filter((el) => {
                if (el.category && !el.brand && !el.year && el.model) {
                    return el;
                }
            });
        }
    };

    render() {
        return (
            <div style={this.state.topMarginBrandYearModelSelection}>
                <ContinueButton />
                <Carousel carouselData={this.state.brandCarouselData} />
                <Carousel carouselData={this.state.yearCarouselData} />
                <Carousel carouselData={this.state.modelCarouselData} />
            </div>
        );
    }
}

export default BrandYearModelSelection;