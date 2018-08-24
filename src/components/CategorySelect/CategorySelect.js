import React, { Component } from 'react';
import CategorySelectStyles from './CategorySelect.css';
import CarouselComponent from './CarouselComponent/CarouselComponent';

class CategorySelect extends Component {

    carouselData;

    constructor(props) {
        super(props);

        this.populatePropsForCarousel(this.props);

        this.state = {
            carouselData: this.carouselData
        };
    }

    populatePropsForCarousel = (props) => {

        if (props[`productsAndImagesData`]) {
            this.carouselData = props.productsAndImagesData.filter((el) => {
                if (el.category && !el.brand) {
                    return el;
                }
            });
        }
    };

    componentWillReceiveProps(newProps) {

        

        this.populatePropsForCarousel(newProps);

        console.log("Hello", this.carouselData);

        this.setState({
            carouselData: this.carouselData
        });
    }

    render() {
        console.log("Render", this.props);
        return (
            <div>
                <p className={CategorySelectStyles.text}>SELECT A CATEGORY</p>
                <div className={CategorySelectStyles.borderAroundCarousel}>
                    <CarouselComponent carouselData={this.state.carouselData} />
                </div>
                <div className="text-center">
                    <i className={`fa fa-check-circle ${CategorySelectStyles.completeIcon} mt-2`} aria-hidden="true"></i>
                </div>
            </div>
        );
    }
}

export default CategorySelect;