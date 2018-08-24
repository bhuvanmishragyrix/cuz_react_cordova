import React, { Component } from 'react';
import CategorySelectStyles from './CategorySelect.css';
import CarouselComponent from './CarouselComponent/CarouselComponent';

class CategorySelect extends Component {

    carouselData;

    constructor(props) {
        super(props);

        if (this.props[`productsAndImagesData`]) {
            this.carouselData = this.props.productsAndImagesData.filter((el) => {
                if (el.category && !el.brand) {
                    return el;
                }
            });
        }

        console.log(this.carouselData);
    }

    render() {

        return (
            <div>
                <p className={CategorySelectStyles.text}>SELECT A CATEGORY</p>
                <div className={CategorySelectStyles.borderAroundCarousel}>
                    <CarouselComponent carouselData={this.carouselData} />
                </div>
                <div className="text-center">
                    <i className={`fa fa-check-circle ${CategorySelectStyles.completeIcon} mt-2`} aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

export default CategorySelect;