import React, { Component } from 'react';
import $ from 'jquery';

import { LINK_TO_ROOT_PATH_OF_DISPLAY_ONLY_IMAGES } from '../../../constants/AppConstants';
import styles from './Carousel.css';
import { circularProgress } from '../../../util/Util';

class Carousel extends Component {

    setWidthAndHeight;

    constructor(props) {
        super(props);
        this.state = {
            carouselData: this.props.carouselData
        };

        console.log("height", this.props.heightOfCarousel);

        this.setWidthAndHeight = {
            height: `${this.props.heightOfCarousel}px`
        }

    }

    componentDidMount() {
        $(`#${this.props.carouselId}`).on('slide.bs.carousel', (event) => {
            this.props.categorySelected(event.to)
        })
    }

    componentWillReceiveProps(newProps) {
        console.log("Reached Line 1");
        if (newProps.carouselData !== this.props.carouselData) {
            console.log("Reached Line 2");
            this.setState({
                carouselData: newProps.carouselData
            })
        }
    }

    render() {
        let content, carouselImage;

        if (this.state.carouselData && this.state.carouselData.hasOwnProperty('length') && this.state.carouselData.length > 0) {


            carouselImage = this.state.carouselData.map((el, index) => {
                let activeClass = "";
                if (index === 0) {
                    activeClass = "active";
                }

                return (
                    <div style={this.setWidthAndHeight} className={`carousel-item ${activeClass}`}>
                        <div className={`d-flex justify-content-center align-items-center ${styles.fullHeight}`}>
                            <img className={`${styles.setImageBackgroundSize} w-25`} src={`${LINK_TO_ROOT_PATH_OF_DISPLAY_ONLY_IMAGES}${el.filename}`} alt={el.category} />
                        </div>
                    </div>
                )
            })

            content = (
                <div id={this.props.carouselId} className="carousel slide" data-interval="false" data-ride="carousel">
                    <div className="carousel-inner">
                        {carouselImage}
                    </div>
                    <a className={`carousel-control-prev`} href={`#${this.props.carouselId}`} role="button" data-slide="prev">
                        <span className={`carousel-control-prev-icon ${styles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className={`carousel-control-next`} href={`#${this.props.carouselId}`} role="button" data-slide="next">
                        <span className={`carousel-control-next-icon ${styles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            );
        }
        else {
            content = (
                <div style={this.setWidthAndHeight} className={`${styles.setPlaceHolderBackground} d-flex justify-content-center align-items-center`}>
                    <p className={`${styles.text}`}>No Models Found For Selected Year!</p>
                </div>
            );
        }

        return (
            content
        );
    }
};

export default Carousel;