import React, { Component } from 'react';
import CategorySelectStyles from './CategorySelect.css';
import CategoryCarouselComponent from './CategoryCarouselComponent/CarouselComponent';
import NewProductCarouselComponent from './NewProductCarouselComponent/NewProductCarouselComponent';
import BottomNavigation from './BottomNavigation/BottomNavigation';

class CategorySelect extends Component {

    categoryCarouselData;
    newProductCarouselData;

    constructor(props) {
        super(props);

        this.populatePropsForCategoryAndNewProductCarousel(this.props);

        this.state = {
            categoryCarouselData: this.categoryCarouselData,
            newProductCarouselData: this.newProductCarouselData
        };
    }

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
                marginBottom: height+10
            }
        });
    };

    render() {
        return (
            <div className={CategorySelectStyles.setMargin}>
                <p className={CategorySelectStyles.text}>SELECT A CATEGORY</p>
                <div className={CategorySelectStyles.borderAroundCarousel}>
                    <CategoryCarouselComponent categoryCarouselData={this.state.categoryCarouselData} />
                </div>
                <div className="text-center">
                    <i className={`fa fa-check-circle ${CategorySelectStyles.completeIcon} my-2`} aria-hidden="true"></i>
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

export default CategorySelect;