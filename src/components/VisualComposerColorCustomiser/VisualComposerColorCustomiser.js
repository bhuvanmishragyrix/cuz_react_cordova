import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appContants from '../../constants/AppConstants'
import PartNameCarouselComponent from './PartNameCarouselComponent/PartNameCarouselComponent';
import styles from './VisualComposerColorCustomiser.css';
import * as util from '../../util/Util';

class VisualComposerColorCustomiser extends Component {

    partFilenamesArray = [];
    partNamesArray = [];
    bikeSVGFilenamesArray = [];
    remainingHeight;

    constructor(props) {
        super(props);

        this.remainingHeight = window.screen.height - appContants.HEIGHT_TO_SUBTRACT_FROM_WINDOW_SCREEN_HEIGHT;

        this.state = {
            wrapperDivStyle: {
                height: `${this.remainingHeight}px`
            },
            controlsDivStyle: {
                height: `${(15 / 100) * (this.remainingHeight)}px`
            },
            imageAndCarouselDivStyle: {
                height: `${(85 / 100) * (this.remainingHeight)}px`
            },
            carouselData: null
        };
    }


    fetchAllPartAndWholeBikeSVGImages = () => {

        this.props.images.forEach((el) => {


            if (!el.isBikeSVG) {
                if (el.category === this.props.selectedCategory && el.brand === this.props.selectedBrand && el.year === this.props.selectedYear && el.model === this.props.selectedModel && el.graphic === this.props.selectedGraphic && el.part) {
                    if (!this.partNamesArray.includes(el.part)) {
                        this.partNamesArray.push(el.part);
                    }
                }
            }
            else {
                this.bikeSVGFilenamesArray.push(el.filename);
            }
        }
        )

        // let bytes = base64.decode(new Buffer(response.data, 'binary').toString('base64'));
        // let image = utf8.decode(bytes);
    };

    // componentDidMount() {
    //     setTimeout(() => {
    //         screen.orientation.lock('landscape').then(() => {
    //             console.log("Successfully locked the orientation");
    //             this.checkDimentionsOfImageAndFlipOrientationIfNecessary();
    //         }, (errMsg) => {
    //             console.log("Error locking the orientation :: " + errMsg);
    //         });
    //     }, 3000);
    // }

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