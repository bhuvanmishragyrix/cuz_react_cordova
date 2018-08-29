import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appConstants from '../../constants/AppConstants';
import ContinueButton from './ContinueButton/ContinueButton';
import Carousel from './Carousel/Carousel';
import styles from './BrandYearModelSelection.css';

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
            modelCarouselData: this.modelCarouselData
        });
    }

    yearSelected = (yearIndex) => {
        this.yearSelectedIndex = yearIndex;
        this.populatePropsForBrandYearModelCarousels(this.props);
        this.setState({
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData
        });
    }

    modelSelected = (modelIndex) => {
        this.modelSelectedIndex = modelIndex;
        this.populatePropsForBrandYearModelCarousels(this.props);
        this.setState({
            brandCarouselData: this.brandCarouselData,
            yearCarouselData: this.yearCarouselData,
            modelCarouselData: this.modelCarouselData
        });
    }

    render() {

        return (
            <div style={this.state.topMarginBrandYearModelSelection}>
                <ContinueButton />
                <p className={`${styles.text} my-2`}>SELECT BRAND</p>
                <div className={styles.borderAroundCarousel}>
                    <Carousel categorySelected={this.brandSelected} carouselId={this.brandCarouselId} carouselData={this.state.brandCarouselData} />
                </div>
                <p className={`${styles.text} my-2`}>SELECT YEAR</p>
                <div className={styles.borderAroundCarousel}>
                    <Carousel categorySelected={this.yearSelected} carouselId={this.yearCarouselId} carouselData={this.state.yearCarouselData} />
                </div>
                <p className={`${styles.text} my-2`}>SELECT BRAND</p>
                <div className={`${styles.borderAroundCarousel} mb-2`}>
                    <Carousel categorySelected={this.modelSelected} carouselId={this.modelCarouselId} carouselData={this.state.modelCarouselData} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedCategory: state.selectedCategory
    }
};

export default connect(mapStateToProps)(BrandYearModelSelection);