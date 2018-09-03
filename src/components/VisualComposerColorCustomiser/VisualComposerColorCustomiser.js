import React, { Component } from 'react';

import * as appContants from '../../constants/AppConstants'
import PartNameCarouselComponent from './PartNameCarouselComponent/PartNameCarouselComponent';
import styles from './VisualComposerColorCustomiser.css';

class VisualComposerColorCustomiser extends Component {

    constructor(props) {
        super(props);

        let remainingHeight = window.screen.height - appContants.HEIGHT_TO_SUBTRACT_FROM_WINDOW_SCREEN_HEIGHT

        this.state = {
            wrapperDivStyle: {
                height: `${remainingHeight}px`
            },
            controlsDivStyle: {
                height: `${(15 / 100) * (remainingHeight)}px`
            },
            imageAndCarouselDivStyle: {
                height: `${(85 / 100) * (remainingHeight)}px`
            },
            carouselData: true
        };
    }

    checkDimentionsOfImageAndFlipOrientationIfNecessary = () => {

    }

    render() {
        return (
            <div className={`bg-danger`} style={this.state.wrapperDivStyle}>
                <div className={`bg-success p-3`} style={this.state.imageAndCarouselDivStyle}>
                    <PartNameCarouselComponent carouselData={this.state.carouselData} />
                    <div className={`${styles.heightOfImageParentDiv} p-3`}>

                    </div>
                </div>
                <div className={`bg-primary p-3`} style={this.state.controlsDivStyle}>
                </div>
            </div>
        );
    }
};

export default VisualComposerColorCustomiser;