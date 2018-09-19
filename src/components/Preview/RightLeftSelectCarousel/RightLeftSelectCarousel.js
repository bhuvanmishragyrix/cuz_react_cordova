import React, { Component } from 'react';
import $ from 'jquery';

import styles from './RightLeftSelectCarousel.css';

class CarouselComponent extends Component {

    constructor(props) {
        super(props);
    }

    registerCarouselSlideCallback = () => {
        $(`#${styles.carouselId}`).on('slide.bs.carousel', (event) => {
            // this.props.categorySelected(event.to)
        })
    };

    componentDidMount() {
        // if (this.props.categoryCarouselData) {
        //     this.registerCarouselSlideCallback();
        // }
    }



    // componentDidUpdate(prevProps) {
    //     if (this.props.categoryCarouselData && !prevProps.categoryCarouselData) {
    //         this.registerCarouselSlideCallback();
    //     }
    // }

    render() {

        let content ="", carouselContent;

        if (this.props.isDisplayed) {
            carouselContent = this.props.carouselData.map((el, index) => {
                let activeClass = "";
                if (index === 0) {
                    activeClass = "active";
                }

                return (
                    <div className={`carousel-item ${activeClass} text-center ${styles.text}`}>
                        {el}
                    </div>
                )
            })

            content = (
                <div id={styles.carouselId} className={`carousel slide ${styles.root}`} data-interval="false" data-ride="carousel">
                    <div className="carousel-inner">
                        {carouselContent}
                    </div>
                    <a className={`carousel-control-prev`} href={`#${styles.carouselId}`} role="button" data-slide="prev">
                        <span className={`carousel-control-prev-icon ${styles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className={`carousel-control-next`} href={`#${styles.carouselId}`} role="button" data-slide="next">
                        <span className={`carousel-control-next-icon ${styles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            );
        }

        return (
            content
        );
    }

};

export default CarouselComponent;