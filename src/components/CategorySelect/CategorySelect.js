import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CategorySelectStyles from './CategorySelect.css';
import CategoryCarouselComponent from './CategoryCarouselComponent/CarouselComponent';
import NewProductCarouselComponent from './NewProductCarouselComponent/NewProductCarouselComponent';
import BottomNavigation from './BottomNavigation/BottomNavigation';
import * as appConstants from '../../constants/AppConstants';
import * as actionTypes from '../../store/actionTypes';

class CategorySelect extends Component {

    categoryCarouselData;
    newProductCarouselData;

    constructor(props) {
        super(props);

        this.populatePropsForCategoryAndNewProductCarousel(this.props);

        this.state = {
            categoryCarouselData: this.categoryCarouselData,
            newProductCarouselData: this.newProductCarouselData,
            topMarginCategorySelect: {
                marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + 30}px`
            },
            selectedCategory: null
        };
    }

    populatePropsForCategoryAndNewProductCarousel = (props) => {

        if (props[`productsAndImagesData`]) {
            this.categoryCarouselData = props.productsAndImagesData.filter((el, index) => {
                if (el.category && !el.brand) {

                    if (!this.props[`productsAndImagesData`] && index === 0) {
                        this.categorySelected(el.category);
                    }

                    return el;
                }
            });
            this.newProductCarouselData = props.productsAndImagesData.filter((el) => {
                if (el.isNewProduct) {
                    return el;
                }
            });
        }
    };

    componentWillReceiveProps(newProps) {
        this.populatePropsForCategoryAndNewProductCarousel(newProps);

        this.setState({
            categoryCarouselData: this.categoryCarouselData,
            newProductCarouselData: this.newProductCarouselData
        });
    }

    setMarginOnNewProduct = (height) => {
        this.setState({
            setMarginBottom: {
                marginBottom: height + 20
            }
        });
    };

    storeCategoryInStoreAndNavigateToBrandYearModelSelectionPage = () => {
        this.props.storeCategoryInStore(this.state.selectedCategory);
        this.props.history.push('/parentForThreeElementTabBarScreens/brandYearModalSelectPage');
    };

    categorySelected = (category) => {
        this.setState({
            selectedCategory: category
        });
    }

    render() {
        return (
            <div style={this.state.topMarginCategorySelect}>
                <p className={CategorySelectStyles.text}>SELECT A CATEGORY</p>
                <div className={CategorySelectStyles.borderAroundCarousel}>
                    <CategoryCarouselComponent categorySelected={this.categorySelected} categoryCarouselData={this.state.categoryCarouselData} />
                </div>
                <div className="text-center">
                    <i onClick={this.storeCategoryInStoreAndNavigateToBrandYearModelSelectionPage} className={`fa fa-check-circle ${CategorySelectStyles.completeIcon} my-2`} aria-hidden="true"></i>
                </div>
                <p className={CategorySelectStyles.text}>NEW PRODUCTS</p>
                <div style={this.state.setMarginBottom} className={`${CategorySelectStyles.borderAroundCarousel}`}>
                    <NewProductCarouselComponent newProductCarouselData={this.state.newProductCarouselData} />
                </div>
                <BottomNavigation setHeightOfBottomNavigation={this.setMarginOnNewProduct} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeCategoryInStore: (category) => {
            dispatch({ type: actionTypes.STORE_CATEGORY, payload: category });
        }
    };
};

export default withRouter(connect(null, mapDispatchToProps)(CategorySelect));