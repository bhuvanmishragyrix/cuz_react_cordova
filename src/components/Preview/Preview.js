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

    previewImageFileNames;
    previewImageAsString;
    previewImageObject;
    imageIds = [];
    imageIdsAndFillPair;
    leftRightCarouselData = ["Left Side", "Right Side"];
    currentlySelectedCarouselIndex = 0;
    svgHeight = 0.7 * window.screen.width;
    sideFileNamesAndImagesArray;
    arrayOfPromisesOfImagesToFetch = [];
    leftPreviewImageInArray;
    rightPreviewImageInArray;
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

        this.sideFileNamesAndImagesArray = this.previewImageFileNames.map((el) => {
            return {
                leftOrRight: el.leftOrRight,
                filename: el.filename
            };
        });

        document.addEventListener('backbutton', this.changeOrientationAndNavigateBackAndRemoveBackButtonEventListener, false);
    }

    createPromiseArrayOfImages = () => {
        this.sideFileNamesAndImagesArray.forEach((el) => {
            let promiseOfImage = util.getBase64OfImage(`${appContants.LINK_TO_ROOT_PATH_OF_IMAGES}${el.filename}`);

            this.arrayOfPromisesOfImagesToFetch.push(promiseOfImage);

        });
    }

    changeOrientationAndNavigateBackAndRemoveBackButtonEventListener = () => {

        screen.orientation.lock('portrait').then(() => {

            window.history.back();
            document.removeEventListener("backbutton", this.changeOrientationAndNavigateBackAndRemoveBackButtonEventListener);

        }, function error(errMsg) {
            console.log("Error locking the orientation :: " + errMsg);
        });

    }

    mapCustomisedImagesColorsToPreviewImage = (element, leftOrRight) => {
        if (element.style.fill) {
            if (leftOrRight === "Left") {
                if (this.leftPreviewImageInArray.length > 0 && this.leftPreviewImageInArray[0].getElementById(element.id)) {

                    this.leftPreviewImageInArray[0].getElementById(element.id).style.fill = element.style.fill;
                }
            }
            else if (leftOrRight === "Right") {
                if (this.rightPreviewImageInArray.length > 0 && this.rightPreviewImageInArray[0].getElementById(element.id)) {

                    this.rightPreviewImageInArray[0].getElementById(element.id).style.fill = element.style.fill;
                }
            }
        }
    }

    // renderSVG = (filename) => {

    //     util.getBase64OfImage(`${appContants.LINK_TO_ROOT_PATH_OF_IMAGES}${filename}`)
    //         .then((response) => {
    //             screen.orientation.lock('landscape').then(() => {

    //                 this.setState({
    //                     loaderContent: "",
    //                     wrapperDivStyle: {
    //                         height: `${this.remainingWidth}px`,
    //                         flexDirection: "column",
    //                         justifyContent: "space-between"
    //                     },
    //                     isCarouselDisplayed: true
    //                 });

    //                 let bytes = base64.decode(new Buffer(response.data, 'binary').toString('base64'));
    //                 this.previewImageAsString = utf8.decode(bytes);

    //                 let parser = new DOMParser();
    //                 this.previewImageObject = parser.parseFromString(this.previewImageAsString, "image/svg+xml").getElementsByTagName("svg")[0];

    //                 this.props.customisedPartsImages.forEach((el) => {

    //                     if (el.leftImageName) {

    //                         el.leftImageObject.querySelectorAll('[id]').forEach((el) => {
    //                             this.mapCustomisedImagesColorsToPreviewImage(el);
    //                         });

    //                     }

    //                     if (el.rightImageName) {

    //                         el.rightImageObject.querySelectorAll('[id]').forEach((el) => {
    //                             this.mapCustomisedImagesColorsToPreviewImage(el);
    //                         });

    //                     }
    //                 });

    //                 document.getElementById(styles.parentOfImage).appendChild(this.previewImageObject);
    //                 $('svg')[0].setAttribute("height", this.svgHeight);

    //             }, function error(errMsg) {
    //                 console.log("Error locking the orientation :: " + errMsg);
    //             });


    //         });
    // }

    populateImagesAsObjectsInsideFileNamesAndImagesArray = () => {
        let parser = new DOMParser();
        this.sideFileNamesAndImagesArray.forEach((el) => {
            if (el.leftOrRight === "Left") {
                el.leftImageObject = parser.parseFromString(el.leftSidePreviewImageAsString, "image/svg+xml").getElementsByTagName("svg")[0];
            }
            else if (el.leftOrRight === "Right") {
                el.rightImageObject = parser.parseFromString(el.rightSidePreviewImageAsString, "image/svg+xml").getElementsByTagName("svg")[0];
            }
        });
    }

    populateImagesAsStringsInsideFileNamesAndImagesArray = () => {

        let responseCounter = 0;

        Promise.all(this.arrayOfPromisesOfImagesToFetch)
            .then((response) => {

                screen.orientation.lock('landscape').then(() => {


                    if (response.length > 0) {
                        this.setState({
                            loaderContent: "",
                            wrapperDivStyle: {
                                height: `${this.remainingWidth}px`,
                                flexDirection: "column",
                                justifyContent: "space-between"
                            },
                            isCarouselDisplayed: true
                        })
                    }

                    this.sideFileNamesAndImagesArray.forEach((el) => {
                        if (el.leftOrRight === "Left") {

                            let bytes;

                            bytes = base64.decode(new Buffer(response[responseCounter].data, 'binary').toString('base64'));
                            el.leftSidePreviewImageAsString = utf8.decode(bytes);
                            responseCounter++;
                        }
                        else if (el.leftOrRight === "Right") {
                            let bytes;

                            bytes = base64.decode(new Buffer(response[responseCounter].data, 'binary').toString('base64'));
                            el.rightSidePreviewImageAsString = utf8.decode(bytes);
                            responseCounter++;
                        }
                    });

                    this.populateImagesAsObjectsInsideFileNamesAndImagesArray();

                    this.leftPreviewImageInArray = this.sideFileNamesAndImagesArray.filter((el) => {
                        if (el.leftOrRight === "Left") {
                            return true;
                        }
                    });

                    if (this.leftPreviewImageInArray.length > 0) {
                        this.leftPreviewImageInArray = this.leftPreviewImageInArray[0].leftImageObject;
                    }

                    this.rightPreviewImageInArray = this.sideFileNamesAndImagesArray.filter((el) => {
                        if (el.leftOrRight === "Right") {
                            return true;
                        }
                    });

                    if (this.rightPreviewImageInArray.length > 0) {
                        this.rightPreviewImageInArray = this.rightPreviewImageInArray[0].rightImageObject;
                    }


                    this.props.customisedPartsImages.forEach((el) => {

                        if (el.leftImageName) {

                            el.leftImageObject.querySelectorAll('[id]').forEach((el) => {
                                this.mapCustomisedImagesColorsToPreviewImage(el, "Left");
                            });

                        }

                        if (el.rightImageName) {

                            el.rightImageObject.querySelectorAll('[id]').forEach((el) => {
                                this.mapCustomisedImagesColorsToPreviewImage(el, "Right");
                            });

                        }
                    });

                    this.renderFirstImage();


                }, function error(errMsg) {
                    console.log("Error locking the orientation :: " + errMsg);
                });


            })
    }

    renderFirstImage = () => {

        if (this.leftPreviewImageInArray.length > 0) {
            document.getElementById(styles.parentOfImage).appendChild(this.leftPreviewImageInArray[0]);
            $('svg')[0].setAttribute("height", this.svgHeight);
        }
        else {
            document.getElementById(styles.parentOfImage).appendChild(this.imageNotAvailableDiv)
        }
    }

    componentDidMount() {

        this.createPromiseArrayOfImages();
        this.populateImagesAsStringsInsideFileNamesAndImagesArray();

    }

    sideSelected = (index) => {


        if ($('svg').length > 0) {
            $('svg')[0].remove();
        }

        if (index === 0) {
            this.sideFileNamesAndImagesArray.forEach((el) => {

                if (el.leftOrRight === "Left") {
                    document.getElementById(styles.parentOfImage).appendChild(el.leftImageObject)
                }

            })
        }
        else if (index === 1) {
            this.sideFileNamesAndImagesArray.forEach((el) => {

                if (el.leftOrRight === "Right") {
                    document.getElementById(styles.parentOfImage).appendChild(el.rightImageObject)
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