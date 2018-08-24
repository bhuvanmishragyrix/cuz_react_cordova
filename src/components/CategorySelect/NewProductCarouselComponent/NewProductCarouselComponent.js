import React from 'react';

import { LINK_TO_ROOT_PATH_OF_IMAGES } from '../../../constants/AppConstants';
import CarouselStyles from './NewProductComponentStyles.css';
import { circularProgress } from '../../../util/Util';

const carouselComponent = (props) => {

    let content, carouselImageContent;

    if (props.newProductCarouselData && props.newProductCarouselData.hasOwnProperty('length') && props.newProductCarouselData.length > 0) {


        carouselImageContent = props.newProductCarouselData.map((el, index) => {
            let activeClass = "";
            if (index === 0) {
                activeClass = "active";
            }

            return (
                <div className={`carousel-item ${activeClass} ${CarouselStyles.setWidthAndHeight} d-flex align-items-center justify-content-center`}>
                    <img className={`${CarouselStyles.setImageBackgroundSize} w-75`} src={`${LINK_TO_ROOT_PATH_OF_IMAGES}${el.filename}`} alt={el.category} />
                </div>
            )
        })

        content = (
            <div id="newProductCarouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {carouselImageContent}
                </div>
                <a className="carousel-control-prev" href="#newProductCarouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#newProductCarouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
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
};

export default carouselComponent;