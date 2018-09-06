import React from 'react';
import styles from './PartNameCarouselComponent.css';


const partNameCarouSelComponent = (props) => {

    let carouselContent;

    let content = (
        <div className={`${styles.root}`}>

        </div>
    );

    if (props.carouselData) {

        carouselContent = props.carouselData.map((el, index) => {
            let activeClass = "";
            if (index === 0) {
                activeClass = "active";
            }

            return (
                <div className={`carousel-item ${styles.height100Percent} ${activeClass}`}>
                    <div className={`d-flex align-items-center justify-content-center ${styles.height100Percent}`}>
                        <p className={`p-0 m-0 ${styles.carouselText}`}>{el}</p>
                    </div>
                </div>
            )
        })

        content = (
            <div id={`${styles.partNameCarousel}`} className={`carousel slide ${styles.root}`} data-interval="false" data-ride="carousel">
                <div className={`carousel-inner ${styles.height100Percent}`}>
                    {carouselContent}
                </div>
                <a className={`carousel-control-prev`} href={`#${styles.partNameCarousel}`} role="button" data-slide="prev">
                    <span className={`carousel-control-prev-icon ${styles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className={`carousel-control-next`} href={`#${styles.partNameCarousel}`} role="button" data-slide="next">
                    <span className={`carousel-control-next-icon ${styles.setCarouselIndicatorColor}`} aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );

    }

    return content;
};

export default partNameCarouSelComponent;