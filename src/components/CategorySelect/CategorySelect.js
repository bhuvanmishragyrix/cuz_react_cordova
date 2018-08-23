import React, { Component } from 'react';
import CategorySelectStyles from './CategorySelect.css';
import CarouselComponent from './CarouselComponent/CarouselComponent';

class CategorySelect extends Component {

carouselData;

    constructor(props) {
        super(props);

        this.carouselData = this.props.productsAndImagesData.filter((el) => {
            if (el.category && !el.brand) {
                return el.category;
            }
        });

        console.log(this.carouselData);
    }

    render() {

        return (
            <div>
                <p className={CategorySelectStyles.text}>SELECT A CATEGORY</p>
                <CarouselComponent carouselData={this.carouselData} />
            </div>
        );
    }
}

export default CategorySelect;