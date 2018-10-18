import React, { Component } from 'react';
import { connect } from 'react-redux';
import base64 from 'base-64';
import utf8 from 'utf8';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';

import * as appContants from '../../constants/AppConstants'
import PartNameCarouselComponent from './PartNameCarouselComponent/PartNameCarouselComponent';
import styles from './VisualComposerColorCustomiser.css';
import * as util from '../../util/Util';
import BottomControls from './BottomControls/BottomControls';
import LeftRightCarousel from './LeftRightCarousel/LeftRightCarousel';
import * as actionTypes from '../../store/actionTypes';
import * as AWSServicesManagement from '../../util/AWSServicesManagement';


class VisualComposerColorCustomiser extends Component {

    leftRightCarouselData = ["Left Side", "Right Side"];
    partNameCarouselCurrentSelectedIndex = 0;
    leftRightCarouselCurrentSelectedIndex;

    partFilenamesAndImagesArray = [];
    partNamesArray = [];
    remainingHeight;

    imageNotPresentDiv;

    leftImagesElements;
    rightImagesElements;

    selectedElement;

    constructor(props) {
        super(props);

        this.remainingHeight = 0.9 * window.screen.height - appContants.HEIGHT_TO_SUBTRACT_FROM_WINDOW_SCREEN_HEIGHT;

        this.state = {
            wrapperDivStyle: {
                height: `${this.remainingHeight}px`
            },
            controlsDivStyle: {
                height: `${(8 / 100) * (this.remainingHeight)}px`
            },
            imageAndCarouselDivStyle: {
                height: `${(90 / 100) * (this.remainingHeight)}px`
            },
            partNameCarouselData: null,
            leftRightCarouselData: null,
            isNextEnable: false,
            fetchAllImages: false
        };

        let parser = new DOMParser();
        this.imageNotPresentDiv = parser.parseFromString(`<div id="${styles.imageNotPresentDiv}" class="px-3 d-flex align-items-center justify-content-center">
        <p class="text-center">The selected side of the image is not available.</p>
        </div>`, "text/html").getElementsByTagName('div')[0];

        document.addEventListener('backbutton', this.clearCustomisedImagesPartsArrayCarouselDataAndRemoveBackButtonEventListener, false);
    }

    clearCustomisedImagesPartsArrayCarouselDataAndRemoveBackButtonEventListener = () => {

        this.props.clearCustomisedImagesPartsArrayCarouselDataAndPriceFromStore();
        // window.CacheClear(() => {

        // }, () => {
        //     console.log("Cache Cleared Unsuccessful");
        // });

        window.history.back();
        document.removeEventListener("backbutton", this.clearCustomisedImagesPartsArrayCarouselDataAndRemoveBackButtonEventListener);
    }


    /**
    * <ul style="list-style:none;">
    * <li> In this function we first parse the images array which is saved in store, it is the main JSON data we fetched from AWS S3 </li>
    * <li> During this parsing we check each image in the data. </li>
    * <li> We check if the image has the same category, brand, year, model, and graphic name as of the ones selected by user. And, </li>
    * <li> The image is not a preview bike image, not a print image, and is a part image.</li>
    * <li> If all these conditions are met we make an entry of the name of that part in 'partNamesArray' (if it already don't exist there), and  </li>
    * <li> An object in 'partFilenamesAndImagesArray' class variables (if it already don't exist there).</li>
    * <li> Also depending on whether it is a left or right side image we create a property leftImageName or rightImageName in that object and save the name of the file (not part name, but file name) there.</li>
    * </ul>
    */
    fetchAllPartAndWholeBikeSVGImageNames = () => {

        this.props.images.forEach((el) => {


            if (!el.isBikeSVG) {
                if (el.category === this.props.selectedCategory && el.brand === this.props.selectedBrand && el.year === this.props.selectedYear && el.model === this.props.selectedModel && el.graphic === this.props.selectedGraphic && el.partname && !el.isPrintSVG) {

                    if (!this.partNamesArray.includes(el.partname)) {
                        this.partNamesArray.push(el.partname);
                        this.partFilenamesAndImagesArray.push({ partname: el.partname });
                    }

                    if (el.leftOrRight === "Left") {
                        this.partFilenamesAndImagesArray.forEach((fileNamesArrayElement) => {
                            if (fileNamesArrayElement.partname === el.partname && !fileNamesArrayElement.hasOwnProperty("leftImageName")) {
                                fileNamesArrayElement.leftImageName = el.filename;
                            }
                        });
                    }
                    else if (el.leftOrRight === "Right") {
                        this.partFilenamesAndImagesArray.forEach((fileNamesArrayElement) => {
                            if (fileNamesArrayElement.partname === el.partname && !fileNamesArrayElement.hasOwnProperty("rightImageName")) {
                                fileNamesArrayElement.rightImageName = el.filename;
                            }
                        });
                    }

                }
            }
        }
        )

    };

    /**
    * <ul style="list-style:none;">
    * <li> In this function we parse each image (which is present in string format) present in 'partFilenamesAndImagesArray' class variable, and</li>
    * <li> Create a parsable object of it (this is done using DOMParser), and </li>
    * <li> Store it in a property in 'partFilenamesAndImagesArray' class variable. </li>
    * <li> Then we call the function 'addCustomisationLogicToAllImages' </li>
    * </ul>
    */
    convertAllPartsImagesToParsableObjectsAndStore = () => {

        let parser = new DOMParser();
        let partFilenamesAndImagesArray;

        partFilenamesAndImagesArray = this.partFilenamesAndImagesArray.map((el) => {

            let leftImageObject = null, rightImageObject = null, toreturn;

            toreturn = { ...el };

            if (el.leftImageName) {
                leftImageObject = parser.parseFromString(el.leftImageAsString, "image/svg+xml").getElementsByTagName("svg")[0];
                toreturn = {
                    ...toreturn,
                    leftImageObject: leftImageObject
                }
            }

            if (el.rightImageName) {
                rightImageObject = parser.parseFromString(el.rightImageAsString, "image/svg+xml").getElementsByTagName("svg")[0];
                toreturn = {
                    ...toreturn,
                    rightImageObject: rightImageObject
                }
            }

            return toreturn;
        });

        this.partFilenamesAndImagesArray = partFilenamesAndImagesArray;
        this.addCustomisationLogicToAllImages();
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we first check if the element passed is a 'path', or a 'rect', or a 'circle', or a 'ellipse', or a 'line', or a 'polygon' </li>
    * <li> If it is we add a click event listener on that element. </li>
    * <li> In that event listener, we first call 'removeBorderAroundCurrentlySelectedElement' function. </li>
    * <li> Then we set the set the class variable 'selectedElement' to this element. </li>
    * <li> Then we call 'setBorderAroundCurrentlySelectedElement' on this element. </li>
    * <li> Then we call 'changeColorOfColorPicker' function. </li>
    * <li> Then we disable the next button if it is enabled. </li>
    * </ul>
    */
    addClickEventListenerOnLeftElements = (element) => {
        if (element.nodeName === "path" || element.nodeName === "rect" || element.nodeName === "circle" || element.nodeName === "ellipse" || element.nodeName === "line" || element.nodeName === "polygon") {
            element.addEventListener("click", () => {
                this.removeBorderAroundCurrentlySelectedElement();
                this.selectedElement = element;
                this.setBorderAroundCurrentlySelectedElement(element);
                this.changeColorOfColorPicker();
                if (this.state.isNextEnable) {
                    this.setState({
                        isNextEnable: !this.state.isNextEnable
                    });
                }
            });
        }

    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we first check if the element passed is a 'path', or a 'rect', or a 'circle', or a 'ellipse', or a 'line', or a 'polygon' </li>
    * <li> If it is we add a click event listener on that element. </li>
    * <li> In that event listener, we first call 'removeBorderAroundCurrentlySelectedElement' function. </li>
    * <li> Then we set the set the class variable 'selectedElement' to this element. </li>
    * <li> Then we call 'setBorderAroundCurrentlySelectedElement' on this element. </li>
    * <li> Then we call 'changeColorOfColorPicker' function. </li>
    * <li> Then we disable the next button if it is enabled. </li>
    * </ul>
    */
    addClickEventListenerOnRightElements = (element) => {
        if (element.nodeName === "path" || element.nodeName === "rect" || element.nodeName === "circle" || element.nodeName === "ellipse" || element.nodeName === "line" || element.nodeName === "polygon") {
            element.addEventListener("click", () => {
                this.removeBorderAroundCurrentlySelectedElement();
                this.selectedElement = element;
                this.setBorderAroundCurrentlySelectedElement();
                this.changeColorOfColorPicker();
                if (this.state.isNextEnable) {
                    this.setState({
                        isNextEnable: !this.state.isNextEnable
                    });
                }
            });

        }
    };

    removeBorderAroundCurrentlySelectedElement = () => {
        if (this.selectedElement) {
            this.selectedElement.removeAttribute('stroke');
            this.selectedElement.removeAttribute('stroke-width');
        }
    }

    setBorderAroundCurrentlySelectedElement = () => {
        this.selectedElement.setAttribute("stroke", "black");
        this.selectedElement.setAttribute("stroke-width", "50");
    }

    /**
    * <ul style="list-style:none;">
    * <li> For each image present in 'partFilenamesAndImagesArray', we find all elements that have an Id. </li>
    * <li> Each element within each part's image must have an id for our algorithm to work. </li>
    * <li> When we save the images using Inkscape in Ubuntu, an id is automatically assigned to all elements. </li>
    * <li> On each of these elements we then call addClickEventListenerOnLeftElements function. </li>
    * </ul>
    */
    addCustomisationLogicToAllImages = () => {
        let i;

        this.partFilenamesAndImagesArray.forEach((el) => {
            if (el.leftImageName) {

                this.leftImagesElements = el.leftImageObject.querySelectorAll('[id]');
                for (i = 0; i < this.leftImagesElements.length; i++) {
                    this.addClickEventListenerOnLeftElements(this.leftImagesElements[i]);
                }
            };

            if (el.rightImageName) {

                this.rightImagesElements = el.rightImageObject.querySelectorAll('[id]');
                for (i = 0; i < this.rightImagesElements.length; i++) {
                    this.addClickEventListenerOnRightElements(this.rightImagesElements[i]);
                }
            }
        })


    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we first create an array of promises, so that we can do something once all of them resolve.</li>
    * <li> Each promise is corresponding to each image fetch operation that we do here, from AWS S3. We fetch all the images that are stored in 'partFilenamesAndImagesArray' class variable.</li>
    * <li> Once all promises are resolved, we check if the length of the response is greater than 0. i.e. means we did receive any image response.</li>
    * <li> If this is the case we set the 'fetchAllImages' state variable to true. We do this to hide the circular loader which is showing on the screen.</li>
    * <li> The images that we get are not in the form of string, so we use the base64 and utf8 libraries to do so. </li>
    * <li> Depending on whether the image is a left or right image, we create a property 'leftImageAsString' or 'rightImageAsString' respectively in the corresponding object of that image in 'partFilenamesAndImagesArray'.</li>
    * <li> We then call the functions convertAllPartsImagesToParsableObjectsAndStore and populatePartNameAndLeftRightCarouselData in sequence. </li>
    * </ul>
    */
    fetchAllPartSVGImages = () => {
        let arrayOfPartImagePromises = [], responseCounter = 0;
        this.partFilenamesAndImagesArray.forEach((el) => {
            if (el.leftImageName) {
                arrayOfPartImagePromises.push(AWSServicesManagement.getSVGImageFromS3(this.props.userJWTToken, `${appContants.LINK_TO_ROOT_PATH_OF_CUSTOMIZABLE_IMAGES}${el.leftImageName}`))
            }
            if (el.rightImageName) {
                arrayOfPartImagePromises.push(AWSServicesManagement.getSVGImageFromS3(this.props.userJWTToken, `${appContants.LINK_TO_ROOT_PATH_OF_CUSTOMIZABLE_IMAGES}${el.rightImageName}`))
            }
        })

        Promise.all(arrayOfPartImagePromises)
            .then((response) => {
                if (response.length > 0) {
                    this.setState({
                        fetchAllImages: true
                    });
                }
                this.partFilenamesAndImagesArray.forEach((el, index) => {
                    let bytes;
                    if (el.leftImageName) {
                        bytes = base64.decode(new Buffer(response[responseCounter], 'binary').toString('base64'));
                        el.leftImageAsString = utf8.decode(bytes);
                        responseCounter++;
                    }

                    if (el.rightImageName) {
                        bytes = base64.decode(new Buffer(response[responseCounter], 'binary').toString('base64'));
                        el.rightImageAsString = utf8.decode(bytes);
                        responseCounter++;
                    }
                })

                this.convertAllPartsImagesToParsableObjectsAndStore();
                this.populatePartNameAndLeftRightCarouselData();

            })
    };

    populatePartNameAndLeftRightCarouselData = () => {
        this.setState({
            partNameCarouselData: this.partNamesArray,
            leftRightCarouselData: this.leftRightCarouselData
        });

        this.renderFirstImageFound();
    }

    /**
    * <ul style="list-style:none;">
    * <li> Here in componentDidMount we first check whether our customisedPartsImages are already stored in store. </li>
    * <li> If it is present it means that we are returning from either the checkout screen or preview screen. </li>
    * <li> Hence we should load the customised images rather than the default ones, and not do everything from scratch. </li>
    * <li> If customisedPartsImages are not saved in store, we do everything from scratch.
    * </ul>
    */
    componentDidMount() {

        if (this.props.customisedPartsImages) {

            this.partFilenamesAndImagesArray = this.props.customisedPartsImages.slice();
            this.addCustomisationLogicToAllImages();

            this.partNamesArray = this.props.visualComposerPartNamesArray;

            this.setState({
                fetchAllImages: true,

            }, () => {
                this.setState({
                    partNameCarouselData: this.props.visualComposerPartNamesArray,
                    leftRightCarouselData: this.props.visualComposerLeftRightCarouselData
                }, () => {
                    this.renderFirstImageFound();
                })
            });

        }
        else {

            console.log("Second");

            this.fetchAllPartAndWholeBikeSVGImageNames();
            this.fetchAllPartSVGImages();
        }
    }

    partNameCarouselSlid = (slidTo) => {
        this.partNameCarouselCurrentSelectedIndex = slidTo;
        this.checkIfSelectedImageIsPresentAndRender();
    }

    leftRightCarouselSlid = (slidTo) => {
        this.leftRightCarouselCurrentSelectedIndex = slidTo;
        this.checkIfSelectedImageIsPresentAndRender();
    }

    checkIfSelectedImageIsPresentAndRender = () => {
        let currentlySelectedPart = this.partNamesArray[this.partNameCarouselCurrentSelectedIndex];

        this.partFilenamesAndImagesArray.forEach((el) => {

            if (el.partname === currentlySelectedPart) {


                if (this.leftRightCarouselCurrentSelectedIndex === 0 && el.hasOwnProperty("leftImageObject")) {
                    this.renderImageAccordingToPartNameIndexAndLeftRightIndex();
                }
                else if (this.leftRightCarouselCurrentSelectedIndex === 1 && el.hasOwnProperty("rightImageObject")) {
                    this.renderImageAccordingToPartNameIndexAndLeftRightIndex();
                }
                else {
                    if ($('svg').length != 0) {
                        $('svg')[0].remove();
                    }
                    document.getElementById(styles.parentOfImage).appendChild(this.imageNotPresentDiv);
                }
            }
        });
    }

    checkAndIfNeededRemoveImageNotPresentDivFromScreen = () => {
        if ($(`#${styles.imageNotPresentDiv}`).length != 0) {
            $(`#${styles.imageNotPresentDiv}`)[0].remove();
        }
    };

    renderFirstImageFound = () => {
        this.partFilenamesAndImagesArray.forEach((el) => {
            if (el.partname === this.partNamesArray[this.partNameCarouselCurrentSelectedIndex]) {
                if (el.hasOwnProperty("leftImageObject")) {
                    this.leftRightCarouselCurrentSelectedIndex = 0;
                }
                else if (el.hasOwnProperty("rightImageObject")) {
                    this.leftRightCarouselCurrentSelectedIndex = 1;
                }
            }
        });

        this.renderImageAccordingToPartNameIndexAndLeftRightIndex();
    }

    renderImageAccordingToPartNameIndexAndLeftRightIndex = () => {

        if (this.state.fetchAllImages) {
            if ($('svg').length != 0) {
                $('svg')[0].remove();
            }
        }
        this.checkAndIfNeededRemoveImageNotPresentDivFromScreen();

        if (this.leftRightCarouselCurrentSelectedIndex === 0) {
            document.getElementById(styles.parentOfImage).appendChild(this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].leftImageObject)
            $('svg')[0].setAttribute("height", "100%");
        }
        else if (this.leftRightCarouselCurrentSelectedIndex === 1) {
            document.getElementById(styles.parentOfImage).appendChild(this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].rightImageObject)
            $('svg')[0].setAttribute("height", "100%");
        }
    }

    onColorChanged = (event) => {
        if (this.selectedElement) {
            this.selectedElement.style.fill = event.color;
        }
    };

    onDoneClick = () => {
        this.removeBorderAroundCurrentlySelectedElement();
        this.selectedElement = null;
    }

    changeIsNextEnable = () => {
        this.setState({
            isNextEnable: !this.state.isNextEnable
        });
    }

    changeColorOfColorPicker = () => {

        if (this.selectedElement.style.fill) {
            this.setState({
                colorOfInput: this.selectedElement.style.fill
            });
        }
        else {
            this.setState({
                colorOfInput: "rgb(0,0,0)"
            });
        }
    }

    onResetClick = () => {

        let parser = new DOMParser();
        let i;


        if (this.leftRightCarouselCurrentSelectedIndex === 0) {
            if ($('svg').length != 0) {
                $('svg')[0].remove();
                let resetImage = parser.parseFromString(this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].leftImageAsString, "image/svg+xml").getElementsByTagName("svg")[0];

                this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].leftImageObject = resetImage;
                document.getElementById(styles.parentOfImage).appendChild(this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].leftImageObject);
                $('svg')[0].setAttribute("height", "100%");
                this.leftImagesElements = this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].leftImageObject.querySelectorAll('[id]');
                for (i = 0; i < this.leftImagesElements.length; i++) {
                    this.addClickEventListenerOnLeftElements(this.leftImagesElements[i]);
                }
            }
        }
        else if (this.leftRightCarouselCurrentSelectedIndex === 1) {
            if ($('svg').length != 0) {
                $('svg')[0].remove();
                let resetImage = parser.parseFromString(this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].rightImageAsString, "image/svg+xml").getElementsByTagName("svg")[0];

                this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].rightImageObject = resetImage;
                document.getElementById(styles.parentOfImage).appendChild(this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].rightImageObject)
                $('svg')[0].setAttribute("height", "100%");
                this.rightImagesElements = this.partFilenamesAndImagesArray[this.partNameCarouselCurrentSelectedIndex].rightImageObject.querySelectorAll('[id]');
                for (i = 0; i < this.rightImagesElements.length; i++) {
                    this.addClickEventListenerOnRightElements(this.rightImagesElements[i]);
                }
            }
        }
    }

    storePartNameArrayAndLeftRightCarouselDataInStore = () => {
        this.props.storePartNameArrayAndLeftRightCarouselData(this.partNamesArray
            , this.leftRightCarouselData);


    }

    storeCustomisedPartsImagesInStoreAndRedirectToPreviewPage = () => {
        let partFilenamesAndImagesArray = this.partFilenamesAndImagesArray.slice();
        this.props.storeCustomisedPartImagesInStore(partFilenamesAndImagesArray);

        this.storePartNameArrayAndLeftRightCarouselDataInStore();
        this.onDoneClick();

        document.removeEventListener("backbutton", this.clearCustomisedImagesPartsArrayCarouselDataAndRemoveBackButtonEventListener);

        this.props.history.push('/preview');
    };

    storeCustomisedPartsImagesInStoreAndRedirectToCheckoutPage = () => {
        let partFilenamesAndImagesArray = this.partFilenamesAndImagesArray.slice();
        this.props.storeCustomisedPartImagesInStore(partFilenamesAndImagesArray);

        this.storePartNameArrayAndLeftRightCarouselDataInStore();
        this.onDoneClick();

        document.removeEventListener("backbutton", this.clearCustomisedImagesPartsArrayCarouselDataAndRemoveBackButtonEventListener);

        this.props.history.push('/checkout');
    }

    render() {

        return (
            <div className={``} style={this.state.wrapperDivStyle} >


                {this.state.fetchAllImages ? (
                    <div className={`p-3`} style={this.state.imageAndCarouselDivStyle}>
                        <div className={`${styles.carouselParent}`}>
                            <PartNameCarouselComponent carouselSlid={this.partNameCarouselSlid} carouselData={this.state.partNameCarouselData} />
                        </div>
                        <div className={`${styles.leftRightSelectionParentDiv}`}>
                            <LeftRightCarousel carouselSlid={this.leftRightCarouselSlid} carouselData={this.state.leftRightCarouselData} />
                        </div>
                        <div className={`${styles.heightOfImageParentDiv} d-flex align-items-center justify-content-center`} id={`${styles.parentOfImage}`}>

                        </div>
                    </div>
                ) : (
                        <div className={`h-100 d-flex align-items-center justify-content-center`}>
                            {util.circularProgress()}
                        </div>
                    )}


                {this.state.fetchAllImages ? (
                    <div className={``} style={this.state.controlsDivStyle}>
                        <BottomControls nextClick={this.storeCustomisedPartsImagesInStoreAndRedirectToCheckoutPage} previewClick={this.storeCustomisedPartsImagesInStoreAndRedirectToPreviewPage} resetClick={this.onResetClick} colorOfInput={this.state.colorOfInput} changeIsNextEnable={this.changeIsNextEnable} isNextEnable={this.state.isNextEnable} doneClick={this.onDoneClick} colorChanged={this.onColorChanged} controlDivStyle={this.state.controlsDivStyle} />
                    </div>
                ) : ""}
            </div >
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
        customisedPartsImages: state.customisedPartsImages,
        visualComposerPartNamesArray: state.visualComposerPartNamesArray,
        visualComposerLeftRightCarouselData: state.visualComposerLeftRightCarouselData,
        userJWTToken: state.userJWTToken

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeCustomisedPartImagesInStore: (payload) => {
            dispatch({
                type: actionTypes.STORE_CUSTOMISED_PARTS_IMAGES,
                payload: {
                    customisedPartsImages: payload
                }
            });
        },
        storePartNameArrayAndLeftRightCarouselData: (partNamesArray, carouselData) => {
            dispatch({
                type: actionTypes.STORE_PART_NAME_ARRAY_AND_LEFT_RIGHT_CAROUSEL_DATA,
                payload: {
                    visualComposerPartNamesArray: partNamesArray,
                    visualComposerLeftRightCarouselData: carouselData
                }
            })
        },
        clearCustomisedImagesPartsArrayCarouselDataAndPriceFromStore: () => {
            dispatch({
                type: actionTypes.CLEAR_CUSTOMISED_IMAGES_AND_PARTS_ARRAY_AND_CAROUSEL_DATA_AND_PRICE
            })
        }
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisualComposerColorCustomiser));