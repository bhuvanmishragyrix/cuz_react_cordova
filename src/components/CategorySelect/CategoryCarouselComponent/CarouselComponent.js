import React, { Component } from 'react';
import $ from 'jquery';

import { LINK_TO_ROOT_PATH_OF_IMAGES } from '../../../constants/AppConstants';
import CarouselStyles from './CarouselComponentStyles.css';
import { circularProgress } from '../../../util/Util';

class CarouselComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('#carouselExampleControls').on('slide.bs.carousel', (event) => {
            this.props.categorySelected(event.to)
        })
    }

    render() {

        let content, carouselImageAndCaptionContent;

        if (this.props.categoryCarouselData && this.props.categoryCarouselData.hasOwnProperty('length') && this.props.categoryCarouselData.length > 0) {


            carouselImageAndCaptionContent = this.props.categoryCarouselData.map((el, index) => {
                let activeClass = "";
                if (index === 0) {
                    activeClass = "active";
                }

                return (
                    <div className={`carousel-item ${activeClass} ${CarouselStyles.setWidthAndHeight} text-center`}>
                        <img className={`${CarouselStyles.setImageBackgroundSize} w-75`} src={`${LINK_TO_ROOT_PATH_OF_IMAGES}${el.filename}`} alt={el.category} />
                        <div className="carousel-caption">
                            <h5 className={CarouselStyles.captionText}>{el.category}</h5>
                        </div>
                    </div>
                )
            })

            content = (
                <div id="carouselExampleControls" className="carousel slide" data-interval="false" data-ride="carousel">
                    <div className="carousel-inner">
                        {carouselImageAndCaptionContent}
                    </div>
                    <a className={`carousel-control-prev`} href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className={`carousel-control-prev-icon ${CarouselStyles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className={`carousel-control-next`} href="#carouselExampleControls" role="button" data-slide="next">
                        <span className={`carousel-control-next-icon ${CarouselStyles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            );
        }
        else {
            content = (
                <div className={`${CarouselStyles.setWidthAndHeight} ${CarouselStyles.setPlaceHolderBackground} d-flex justify-content-center align-items-center`}>
                    {circularProgress()}
                </div>
            );
        }

        return (
            content
        );
    }

};

export default CarouselComponent;