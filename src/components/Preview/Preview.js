import React, { Component } from 'react';
import { connect } from 'react-redux';
import base64 from 'base-64';
import utf8 from 'utf8';
import $ from 'jquery';

import * as util from '../../util/Util';
import * as appContants from '../../constants/AppConstants';
import styles from './Preview.css';
import RightLeftSelectCarousel from './RightLeftSelectCarousel/RightLeftSelectCarousel';

class Preview extends Component {

    previewImageFileName;
    previewImageAsString;
    previewImageObject;
    imageIds = [];
    imageIdsAndFillPair;
    leftRightCarouselData = ["Left Side", "Right Side"];
    currentlySelectedCarouselIndex = 0;
    svgHeight = 0.7 * window.screen.width;
    imageNotAvailableDiv = new DOMParser().parseFromString(`<div style=" height: ${this.svgHeight};" class="${styles.sideNotAvailableDiv} d-flex justify-content-center align-items-center p-3">
    <p class="text-center">This side is not available for preview!</p>
    </div>`, "text/html").getElementsByTagName('div')[0];

    constructor(props) {
        super(props);

        this.remainingHeight = 0.9 * window.screen.height - appContants.HEIGHT_TO_SUBTRACT_FROM_WINDOW_SCREEN_HEIGHT;
        this.remainingWidth = 0.9 * window.screen.width - appContants.HEIGHT_TO_SUBTRACT_FROM_WINDOW_SCREEN_HEIGHT;

        this.state = {
            loaderContent: util.circularProgress(),
            wrapperDivStyle: {
                height: `${this.remainingHeight}px`,
                justifyContent: "center"
            },
            loaderState: {
                height: `${this.remainingHeight}px`
            },
            isCarouselDisplayed: false
        };

        this.previewImageFileNames = this.props.images.filter((el) => {
            if (this.props.selectedCategory === el.category &&
                this.props.selectedBrand === el.brand &&
                this.props.selectedYear === el.year &&
                this.props.selectedModel === el.model &&
                this.props.selectedGraphic === el.graphic &&
                el.isBikeSVG) {
                return true;
            }
        });

        document.addEventListener('backbutton', this.changeOrientationAndNavigateBackAndRemoveBackButtonEventListener, false);
    }

    changeOrientationAndNavigateBackAndRemoveBackButtonEventListener = () => {

        screen.orientation.lock('portrait').then(() => {

            window.history.back();
            document.removeEventListener("backbutton", this.changeOrientationAndNavigateBackAndRemoveBackButtonEventListener);

        }, function error(errMsg) {
            console.log("Error locking the orientation :: " + errMsg);
        });

    }

    mapCustomisedImagesColorsToPreviewImage = (element) => {
        if (element.style.fill) {
            if (this.previewImageObject.getElementById(element.id)) {
                this.previewImageObject.getElementById(element.id).style.fill = element.style.fill;
            }
        }
    }

    renderSVG = (filename) => {

        util.getBase64OfImage(`${appContants.LINK_TO_ROOT_PATH_OF_IMAGES}${filename}`)
            .then((response) => {
                screen.orientation.lock('landscape').then(() => {

                    this.setState({
                        loaderContent: "",
                        wrapperDivStyle: {
                            height: `${this.remainingWidth}px`,
                            flexDirection: "column",
                            justifyContent: "space-between"
                        },
                        loaderState: {
                            display: "none",
                            height: `0px`
                        },
                        isCarouselDisplayed: true
                    });

                    let bytes = base64.decode(new Buffer(response.data, 'binary').toString('base64'));
                    this.previewImageAsString = utf8.decode(bytes);

                    let parser = new DOMParser();
                    this.previewImageObject = parser.parseFromString(this.previewImageAsString, "image/svg+xml").getElementsByTagName("svg")[0];

                    this.props.customisedPartsImages.forEach((el) => {

                        if (el.leftImageName) {

                            el.leftImageObject.querySelectorAll('[id]').forEach((el) => {
                                this.mapCustomisedImagesColorsToPreviewImage(el);
                            });

                        }

                        if (el.rightImageName) {

                            el.rightImageObject.querySelectorAll('[id]').forEach((el) => {
                                this.mapCustomisedImagesColorsToPreviewImage(el);
                            });

                        }
                    });

                    document.getElementById(styles.parentOfImage).appendChild(this.previewImageObject);
                    $('svg')[0].setAttribute("height", this.svgHeight);

                }, function error(errMsg) {
                    console.log("Error locking the orientation :: " + errMsg);
                });


            });
    }

    componentDidMount() {

        this.sideSelected(1);

    }

    sideSelected = (index) => {


        if ($('svg').length > 0) {
            $('svg')[0].remove();
        }

        if (index === 0) {
            this.previewImageFileNames.forEach((el) => {
                if (el.leftOrRight) {
                    if (el.leftOrRight === "Left") {
                        this.renderSVG(el.filename);
                    }
                }

            })
        }
        else if (index === 1) {
            console.log("Render SVG", this.previewImageFileNames);
            this.previewImageFileNames.forEach((el) => {
                if (el.leftOrRight) {
                    if (el.leftOrRight === "Right") {
                        this.renderSVG(el.filename);
                    }
                }

            })
        }


        if ($('svg').length > 0) {

            if (document.getElementsByClassName(styles.sideNotAvailableDiv).length > 0) {
                document.getElementsByClassName(styles.sideNotAvailableDiv)[0].remove();
            }

        }
        else {
            if (!document.getElementsByClassName(styles.sideNotAvailableDiv).length > 0) {
                document.getElementById(styles.parentOfImage).appendChild(this.imageNotAvailableDiv);
            }
        }
    }

    render() {
        return (
            <div style={this.state.wrapperDivStyle} id={styles.parentOfImage} className={`d-flex align-items-center pb-1`}>
                <RightLeftSelectCarousel sideSelected={this.sideSelected} isDisplayed={this.state.isCarouselDisplayed} carouselData={this.leftRightCarouselData} />
                {this.state.loaderContent}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.images,
        customisedPartsImages: state.customisedPartsImages,
        selectedCategory: state.selectedCategory,
        selectedBrand: state.selectedBrand,
        selectedYear: state.selectedYear,
        selectedModel: state.selectedModel,
        selectedGraphic: state.selectedGraphic
    };
};

export default connect(mapStateToProps)(Preview);