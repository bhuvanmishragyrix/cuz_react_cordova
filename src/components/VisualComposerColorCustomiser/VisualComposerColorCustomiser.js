import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appContants from '../../constants/AppConstants'
import PartNameCarouselComponent from './PartNameCarouselComponent/PartNameCarouselComponent';
import styles from './VisualComposerColorCustomiser.css';
import * as util from '../../util/Util';

class VisualComposerColorCustomiser extends Component {

    partNameFilenameArrays = [];
    bikeSVGFilenameArrays = [];

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
            carouselData: null
        };
    }


    fetchAllPartAndWholeBikeSVGImages = () => {

        this.props.images.forEach((el) => {


            if (!el.isBikeSVG) {
                if (el.category === this.props.selectedCategory && el.brand === this.props.selectedBrand && el.year === this.props.selectedYear && el.model === this.props.selectedModel && el.graphic === this.props.selectedGraphic) {
                    console.log("Reached Here", el)
                }
            }
            else {
                this.bikeSVGFilenameArrays.push(el.filename);
            }
        }
        )

        // let bytes = base64.decode(new Buffer(response.data, 'binary').toString('base64'));
        // let image = utf8.decode(bytes);
    };


    checkDimentionsOfImageAndFlipOrientationIfNecessary = () => {

    }

    render() {

        this.fetchAllPartAndWholeBikeSVGImages();

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

const mapStateToProps = (state) => {
    return {
        images: state.images,
        selectedCategory: state.selectedCategory,
        selectedBrand: state.selectedBrand,
        selectedYear: state.selectedYear,
        selectedModel: state.selectedModel,
        selectedGraphic: state.selectedGraphic,
    };
};


export default connect(mapStateToProps)(VisualComposerColorCustomiser);