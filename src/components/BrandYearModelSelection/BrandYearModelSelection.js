import React, { Component } from 'react';

import * as appConstants from '../../constants/AppConstants';
import ContinueButton from './ContinueButton/ContinueButton';
import Carousel from './Carousel/Carousel';
import styles from './BrandYearModelSelection.css';

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
        }, () => {
            console.log(this.state.brandCarouselData, this.state.yearCarouselData, this.state.modelCarouselData);
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
                if (!el.category && !el.brand && el.year && !el.model) {
                    return el;
                }
            });
            this.modelCarouselData = props.productsAndImagesData.filter((el) => {
                if (el.category && el.brand && el.year && el.model && !el.graphic) {
                    return el;
                }
            });
        }
    };

    render() {
        return (
            <div style={this.state.topMarginBrandYearModelSelection}>
                <ContinueButton />
                <div className={styles.borderAroundCarousel}>
                    <Carousel carouselData={this.state.brandCarouselData} />
                </div>
                <div className={styles.borderAroundCarousel}>
                    <Carousel carouselData={this.state.yearCarouselData} />
                </div>
                <div className={styles.borderAroundCarousel}>
                    <Carousel carouselData={this.state.modelCarouselData} />
                </div>
            </div>
        );
    }
}

export default BrandYearModelSelection;