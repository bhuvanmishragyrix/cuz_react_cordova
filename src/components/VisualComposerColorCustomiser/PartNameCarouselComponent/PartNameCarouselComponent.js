import React, { Component } from 'react';
import styles from './PartNameCarouselComponent.css';


class PartNameCarouSelComponent extends Component {


    carouselContent;

    constructor(props) {
        super(props);
        this.state = {
            content: <div className={`${styles.root}`}>

            </div>
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.carouselData) {

            this.carouselContent = newProps.carouselData.map((el, index) => {
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

            this.setState({
                content: (
                    <div id={`${styles.partNameCarousel}`} className={`carousel slide ${styles.root}`} data-interval="false" data-ride="carousel">
                        <div className={`carousel-inner ${styles.height100Percent}`}>
                            {this.carouselContent}
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
                )
            });

        }
    }

    render() {

        return this.state.content;
    }

};

export default PartNameCarouSelComponent;