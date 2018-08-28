import React from 'react';

import { LINK_TO_ROOT_PATH_OF_IMAGES } from '../../../constants/AppConstants';
import styles from './Carousel.css';
import { circularProgress } from '../../../util/Util';

const carousel = (props) => {
    let content, carouselImage;

    if (props.carouselData && props.carouselData.hasOwnProperty('length') && props.carouselData.length > 0) {


        carouselImage = props.carouselData.map((el, index) => {
            let activeClass = "";
            if (index === 0) {
                activeClass = "active";
            }

            return (
                <div className={`carousel-item ${activeClass} ${styles.setWidthAndHeight} text-center`}>
                    <img className={`${styles.setImageBackgroundSize} w-75`} src={`${LINK_TO_ROOT_PATH_OF_IMAGES}${el.filename}`} alt={el.category} />
                </div>
            )
        })

        content = (
            <div id="carouselExampleControls" className="carousel slide" data-interval="false" data-ride="carousel">
                <div className="carousel-inner">
                    {carouselImage}
                </div>
                <a className={`carousel-control-prev`} href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className={`carousel-control-prev-icon ${styles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className={`carousel-control-next`} href="#carouselExampleControls" role="button" data-slide="next">
                    <span className={`carousel-control-next-icon ${styles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
    else {
        content = (
            <div className={`${styles.setWidthAndHeight} ${styles.setPlaceHolderBackground} d-flex justify-content-center align-items-center`}>
                {circularProgress()}
            </div>
        );
    }

    return (
        content
    );
};

export default carousel;