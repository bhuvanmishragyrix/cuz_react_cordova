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

    constructor(props) {
        super(props);

        this.populatePropsForCategoryAndNewProductCarousel(this.props);

        this.state = {
            categoryCarouselData: this.categoryCarouselData,
            newProductCarouselData: this.newProductCarouselData,
            topMarginCategorySelect: {
                marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + 30}px`
            },
            selectedCategory: null,
            isContinueButtonDisabled: true,
            onContinueClick: ()=> {}
        };
    }

    componentDidMount() {
        if (this.props[`productsAndImagesData`]) {
            console.log("Reached Here");
            this.categorySelected(0);
        }
    }

    populatePropsForCategoryAndNewProductCarousel = (props) => {

        if (props[`productsAndImagesData`]) {
            this.categoryCarouselData = props.productsAndImagesData.filter((el, index) => {
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

    componentWillReceiveProps(newProps) {
        this.populatePropsForCategoryAndNewProductCarousel(newProps);

        if (newProps[`productsAndImagesData`] && !this.props[`productsAndImagesData`]) {
            this.categorySelected(0);
        }

        this.setState({
            categoryCarouselData: this.categoryCarouselData,
            newProductCarouselData: this.newProductCarouselData,
            isContinueButtonDisabled: false,
            onContinueClick: this.storeCategoryInStoreAndNavigateToBrandYearModelSelectionPage
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
        console.log(this.state.selectedCategory);
        this.props.storeCategoryInStore(this.state.selectedCategory);
        this.props.history.push('/parentForThreeElementTabBarScreens/brandYearModalSelectPage');
    };

    categorySelected = (categoryIndex) => {

        console.log("categoryChanged", categoryIndex);

        this.setState({
            selectedCategory: this.categoryCarouselData[categoryIndex].category
        });
    }

    render() {
        return (
            <div style={this.state.topMarginCategorySelect}>
                <p className={CategorySelectStyles.text}>SELECT A CATEGORY</p>
                <div className={CategorySelectStyles.borderAroundCarousel}>
                    <CategoryCarouselComponent categorySelected={this.categorySelected} categoryCarouselData={this.state.categoryCarouselData} />
                </div>
                <div className={`my-4`} onClick={this.state.onContinueClick}>
                    <ContinueButton isDisabled={this.state.isContinueButtonDisabled}/>
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