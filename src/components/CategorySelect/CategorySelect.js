import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CategorySelectStyles from './CategorySelect.css';
import CategoryCarouselComponent from './CategoryCarouselComponent/CarouselComponent';
import NewProductCarouselComponent from './NewProductCarouselComponent/NewProductCarouselComponent';
import BottomNavigation from './BottomNavigation/BottomNavigation';
import * as appConstants from '../../constants/AppConstants';
import * as actionTypes from '../../store/actionTypes';
import ContinueButton from '../UIComponents/ContinueButton/ContinueButton';

class CategorySelect extends Component {

    categoryCarouselData;
    newProductCarouselData;

    /**
    * <ul style="list-style:none;">
    * <li> In the constructor we first call the function 'populatePropsForCategoryAndNewProductCarousel' and set the initial value of some state variables. </li>
    * </ul>
    */
    constructor(props) {
        super(props);

        this.populatePropsForCategoryAndNewProductCarousel(this.props);

        this.state = {
            categoryCarouselData: this.categoryCarouselData,
            newProductCarouselData: this.newProductCarouselData,
            topMarginCategorySelect: {
                marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
            },
            selectedCategory: null,
            selectedCategoryImageFileName: null,
            isContinueButtonDisabled: !this.props[`productsAndImagesData`],
            onContinueClick: this.props[`productsAndImagesData`] ? this.storeCategoryInStoreAndNavigateToBrandYearModelSelectionPage : () => { }
        };
    }

    componentDidMount() {
        if (this.props[`productsAndImagesData`]) {
            console.log("Reached Here");
            this.categorySelected(0);
        }
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we populate the class variables 'categoryCarouselData' and 'newProductCarouselData' from props, for setting data for category and new product carousels. </li>
    * </ul>
    */
    populatePropsForCategoryAndNewProductCarousel = (props) => {

        if (props[`productsAndImagesData`]) {
            this.categoryCarouselData = props.productsAndImagesData.filter((el) => {
                if (el.category && !el.brand) {
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

    /**
    * <ul style="list-style:none;">
    * <li> We set this function so that in case the carousel data wasn't available in the constructor, it is passed to the carousel when it has become available. </li>
    * </ul>
    */
    componentWillReceiveProps(newProps) {
        this.populatePropsForCategoryAndNewProductCarousel(newProps);

        if (newProps[`productsAndImagesData`] && !this.props[`productsAndImagesData`]) {
            this.categorySelected(0);

            this.setState({
                categoryCarouselData: this.categoryCarouselData,
                newProductCarouselData: this.newProductCarouselData,
                isContinueButtonDisabled: false,
                onContinueClick: this.storeCategoryInStoreAndNavigateToBrandYearModelSelectionPage
            });
        }
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we save the selected category and selected category image filename in store, and </li>
    * <li> Then we redirect to BrandYearModelSelectionPage (from 'src/containers/BrandYearModelSelectionPage.js') </li>
    * </ul>
    */
    storeCategoryInStoreAndNavigateToBrandYearModelSelectionPage = () => {
        this.props.storeCategoryAndCategoryImageNameInStore(this.state.selectedCategory, this.state.selectedCategoryImageFileName);
        this.props.history.push('/parentForThreeElementTabBarScreens/brandYearModalSelectPage');
    };

    /**
    * <ul style="list-style:none;">
    * <li> When a category is selected, this function is executed, and we set the state variables 'selectedCategory' and 'selectedCategoryImageFileName' to appropriate values.</li>
    * </ul>
    */
    categorySelected = (categoryIndex) => {

        this.setState({
            selectedCategory: this.categoryCarouselData[categoryIndex].category,
            selectedCategoryImageFileName: this.categoryCarouselData[categoryIndex].filename
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> This is the render function of our class.</li>
    * </ul>
    */
    render() {
        return (
            <div style={this.state.topMarginCategorySelect} className={`mb-2`}>
                <p className={CategorySelectStyles.text}>SELECT A CATEGORY</p>
                <div className={CategorySelectStyles.borderAroundCarousel}>
                    <CategoryCarouselComponent categorySelected={this.categorySelected} categoryCarouselData={this.state.categoryCarouselData} />
                </div>
                <div className={`my-4`} onClick={this.state.onContinueClick}>
                    <ContinueButton isDisabled={this.state.isContinueButtonDisabled} />
                </div>
                <p className={CategorySelectStyles.text}>NEW PRODUCTS</p>
                <div style={this.state.setMarginBottom} className={`${CategorySelectStyles.borderAroundCarousel}`}>
                    <NewProductCarouselComponent newProductCarouselData={this.state.newProductCarouselData} />
                </div>
                {/* <BottomNavigation setHeightOfBottomNavigation={this.setMarginOnNewProduct} /> */}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        /**
        * <ul style="list-style:none;">
        * <li> In this function we save the selected category and selected category filename in store.</li>
        * </ul>
        */
        storeCategoryAndCategoryImageNameInStore: (category, imageName) => {
            dispatch({
                type: actionTypes.STORE_CATEGORY_AND_CATEGORY_IMAGE_NAME, payload: {
                    category: category,
                    selectedCategoryImageFileName: imageName
                }
            });
        }
    };
};

export default withRouter(connect(null, mapDispatchToProps)(CategorySelect));