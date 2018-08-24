import React from 'react';
import  CircularProgress  from '@material-ui/core/CircularProgress';

import { LINK_TO_ROOT_PATH_OF_IMAGES } from '../../../constants/AppConstants';
import CarouselStyles from './CarouselComponentStyles.css';

const carouselComponent = (props) => {

    let content, carouselImageAndCaptionContent;

    if (props.carouselData && props.carouselData.hasOwnProperty('length') && props.carouselData.length > 0) {


        carouselImageAndCaptionContent = props.carouselData.map((el, index) => {
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

        console.log("Reached Here", carouselImageAndCaptionContent);

        content = (
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {carouselImageAndCaptionContent}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
    else {
        content = (
            <div className={`${CarouselStyles.setWidthAndHeight} d-flex justify-content-center align-items-center bg-danger`}>
                <CircularProgress />
            </div>
        );
    }

    console.log("content", content);

    return (
        content
    );
};

export default carouselComponent;