import React, { Component } from 'react';
import { connect } from 'react-redux';
import base64 from 'base-64';
import utf8 from 'utf8';
import $ from 'jquery';

import * as util from '../../util/Util';
import * as appContants from '../../constants/AppConstants';
import styles from './Preview.css';
import RightLeftSelectCarousel from './RightLeftSelectCarousel/RightLeftSelectCarousel';

import * as AWSServicesManagement from '../../util/AWSServicesManagement';

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

    /**
    * <ul style="list-style:none;">
    * <li> In the constructor we set the height of the wrapper div, so as to center the loader in the middle. </li>
    * <li> We filter out the names of appropriate preview images and whether the image is left or right side image here in the constructor. </li>
    * <li> We also set the back button press event listener, to execute the function 'changeOrientationAndNavigateBackAndRemoveBackButtonEventListener' on press of back button. </li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> We create an array of promises here. </li>
    * <li> Each promise here is corresponding to a fetch operation of a preview image from AWS S3. </li>
    * <li> We do this in order to be able to wait until all promises are resolved (all images fetched from S3), via Promise.all (done later). </li>
    * </ul>
    */
    createPromiseArrayOfImages = () => {
        this.sideFileNamesAndImagesArray.forEach((el) => {
            let promiseOfImage = AWSServicesManagement.getSVGImageFromS3(this.props.userJWTToken, `${appContants.LINK_TO_ROOT_PATH_OF_CUSTOMIZABLE_IMAGES}${el.filename}`);

            this.arrayOfPromisesOfImagesToFetch.push(promiseOfImage);

        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we change the screen orientation back to 'portrait', and </li>
    * <li> Then navigate back, and </li>
    * <li> Remove our custom on back button press event listener. </li>
    * </ul>
    */
    changeOrientationAndNavigateBackAndRemoveBackButtonEventListener = () => {

        screen.orientation.lock('portrait').then(() => {

            window.history.back();
            document.removeEventListener("backbutton", this.changeOrientationAndNavigateBackAndRemoveBackButtonEventListener);

        }, function error(errMsg) {
            console.log("Error locking the orientation :: " + errMsg);
        });

    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we map all the color customisations we did on the VisualComposerColorCustomiser to the preview images. </li>
    * </ul>
    */
    mapCustomisedImagesColorsToPreviewImage = (element) => {
        if (element.style.fill) {

            this.sideFileNamesAndImagesArray.forEach((el) => {
                if (el.leftImageObject && el.leftImageObject.getElementById(element.id)) {

                    el.leftImageObject.getElementById(element.id).style.fill = element.style.fill;
                }
                else if (el.rightImageObject && el.rightImageObject.getElementById(element.id)) {
    
                    el.rightImageObject.getElementById(element.id).style.fill = element.style.fill;
                }
            });
        }



    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we create an attribute which stores the preview images downloaded from S3 in parsable Object form. </li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> In this function we first fetch the preview Images from AWS S3. </li>
    * <li> Then we create an attribute which stores the preview images downloaded from S3 as a string. </li>
    * <li>  </li>
    * </ul>
    */
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
                                justifyContent: "flex-end"
                            },
                            isCarouselDisplayed: true
                        })
                    }

                    this.sideFileNamesAndImagesArray.forEach((el) => {
                        if (el.leftOrRight === "Left") {

                            let bytes;

                            bytes = base64.decode(new Buffer(response[responseCounter], 'binary').toString('base64'));
                            el.leftSidePreviewImageAsString = utf8.decode(bytes);
                            responseCounter++;
                        }
                        else if (el.leftOrRight === "Right") {
                            let bytes;

                            bytes = base64.decode(new Buffer(response[responseCounter], 'binary').toString('base64'));
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
                                this.mapCustomisedImagesColorsToPreviewImage(el);
                            });

                        }

                        if (el.rightImageName) {

                            el.rightImageObject.querySelectorAll('[id]').forEach((el) => {
                                this.mapCustomisedImagesColorsToPreviewImage(el);
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
                    $('svg')[0].setAttribute("height", this.svgHeight)
                }

            })
        }
        else if (index === 1) {
            this.sideFileNamesAndImagesArray.forEach((el) => {

                if (el.leftOrRight === "Right") {
                    document.getElementById(styles.parentOfImage).appendChild(el.rightImageObject)
                    $('svg')[0].setAttribute("height", this.svgHeight)
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
        selectedGraphic: state.selectedGraphic,
        userJWTToken: state.userJWTToken
    };
};

export default connect(mapStateToProps)(Preview);