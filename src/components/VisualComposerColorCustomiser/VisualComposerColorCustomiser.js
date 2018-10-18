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

    /**
    * <ul style="list-style:none;">
    * <li> In constructor we first find the height of the screen, subtracting the height that would approximately be taken by the top region on phone (e.g. where the battery indicator, signal strength shows up etc)</li>
    * <li> We then take 90% of that height and store it in the class variable 'remainingHeight'. </li> 
    * <li> We have wrapper our entire screen in a div named 'wrapperDivStyle'. So we set its height equal to 'remainingHeight' class variable. </li>
    * <li> We set 8% of 'remainingHeight' as the height of the bottom controls on the screen. </li>
    * <li> We set 90% of 'remainingHeight' as the height of the section where the image and the two carousels show up. </li>
    * <li> We set the part name carousel data to null in state. </li>
    * <li> We set the left-right carousel data to null in state. </li>
    * <li> We set 'isNextEnable' to false intially so that the next button on the bottom controls is disabled by default. </li>
    * <li> We set 'fetchAllImages' variable to false initially, to show a loader until data is not fetched from the back end. </li>
    * <li> We then prepare the div which is shown in case a certain image is not present. We store it in 'imageNotPresentDiv' class variable. </li>
    * <li> We then set the back button press event listener to override the default behavior, and execute the function 'clearCustomisedImagesPartsArrayCarouselDataAndRemoveBackButtonEventListener' on press of back button. </li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> In this function we first execute the 'clearCustomisedImagesPartsArrayCarouselDataAndPriceFromStore' function defined in mapDispatchToProps. </li>
    * <li> Then we navigate back. </li>
    * <li> We then remove our custom event listener that we set (for the event of of on back button press) in the constructor. </li>
    * </ul>
    */
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
    * * @param {Object} element The element on upon which the click event listener has to be attached
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
    * @param {Object} element The element on upon which the click event listener has to be attached
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

    /**
    * <ul style="list-style:none;">
    * <li> In this function we remove the border around the current element set to 'selectedElement' class variable, if 'selectedElement' is not null</li>
    * </ul>
    */
    removeBorderAroundCurrentlySelectedElement = () => {
        if (this.selectedElement) {
            this.selectedElement.removeAttribute('stroke');
            this.selectedElement.removeAttribute('stroke-width');
        }
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we set the border around the element set to 'selectedElement' class variable, if 'selectedElement' is not null</li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> In this function we populate the state variables 'partNameCarouselData' and 'leftRightCarouselData' with appropriate data. </li>
    * <li> This in turn populates both the part name and left-right carousel </li>
    * <li> We then call the 'renderFirstImageFound' function. </li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> This function executes when the part name carousel is slid. </li>
    * <li> Then we call the function 'checkIfSelectedImageIsPresentAndRender' </li>
    * </ul>
    */
    partNameCarouselSlid = (slidTo) => {
        this.partNameCarouselCurrentSelectedIndex = slidTo;
        this.checkIfSelectedImageIsPresentAndRender();
    }

    /**
    * <ul style="list-style:none;">
    * <li> This function executes when the left-right carousel is slid. </li>
    * <li> Then we call the function 'checkIfSelectedImageIsPresentAndRender' </li>
    * </ul>
    */
    leftRightCarouselSlid = (slidTo) => {
        this.leftRightCarouselCurrentSelectedIndex = slidTo;
        this.checkIfSelectedImageIsPresentAndRender();
    }

    /**
    * <ul style="list-style:none;">
    * <li> On the slid of any carousel, in this function we check if the image selected exists. If it does, we render it. </li>
    * <li> If it doesn't exist we remove the currently rendered image (SVG) from the screen and render the 'The selected side of the image is not available' text to the screen. </li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> In this function we check if the text, "The selected side of the image is not available", is present on the screen. </li>
    * </li> If it is we remove it. </li>
    * </ul>
    */
    checkAndIfNeededRemoveImageNotPresentDivFromScreen = () => {
        if ($(`#${styles.imageNotPresentDiv}`).length != 0) {
            $(`#${styles.imageNotPresentDiv}`)[0].remove();
        }
    };

    /**
    * <ul style="list-style:none;">
    * <li> In this function we set the variable 'leftRightCarouselCurrentSelectedIndex' to left image of first part of 'partNamesArray', if the left image exists, or </li>
    * <li> We set the variable 'leftRightCarouselCurrentSelectedIndex' to right image of of first part of 'partNamesArray' </li>
    * <li> Then we call the 'renderImageAccordingToPartNameIndexAndLeftRightIndex' function.</li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> In this function we first check if 'fetchAllImages' state variable is set, </li>
    * <li> We do this check to ensure that the circular loader is not removed by this code, as that too is an SVG </li>
    * <li> If that variable is set, and there is an SVG on the page, we remove it </li>
    * <li> Then we call 'checkAndIfNeededRemoveImageNotPresentDivFromScreen' function. </li>
    * <li> Then we place the appropriate SVG on the screen based on the current value of part name carousel, and left-right carousel </li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> In this function we set the color of the currently selected element to the color selected in the color picker. </li>
    * </ul>
    * @param {Object} event The event object returned by the color picker.
    */
    onColorChanged = (event) => {
        if (this.selectedElement) {
            this.selectedElement.style.fill = event.color;
        }
    };

    /**
    * <ul style="list-style:none;">
    * <li> In this function we first call the 'removeBorderAroundCurrentlySelectedElement' function, and </li>
    * <li> Then we set the 'selectedElement' class variable  to null. </li>
    * </ul>
    */
    onDoneClick = () => {
        this.removeBorderAroundCurrentlySelectedElement();
        this.selectedElement = null;
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we invert the value of isNextEnable </li>
    * </ul>
    */
    changeIsNextEnable = () => {
        this.setState({
            isNextEnable: !this.state.isNextEnable
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we set the state variable 'colorOfInput' to the color of the currently selected element, provided that the currently selected element has a color.</li>
    * <li> If the currently selected element doesn't have a color, we set the state variable 'colorOfInput' to black color. </li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li>In this function we set the current image on the page to its default version, removing all customisations applied.</li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> In this function we call 'storePartNameArrayAndLeftRightCarouselData' function.</li>
    * </ul>
    */
    storePartNameArrayAndLeftRightCarouselDataInStore = () => {
        this.props.storePartNameArrayAndLeftRightCarouselData(this.partNamesArray
            , this.leftRightCarouselData);


    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we first save the customised parts in store, with the help of the function 'storeCustomisedPartImagesInStore'. </li>
    * <li>Then we call 'storePartNameArrayAndLeftRightCarouselDataInStore' function.</li>
    * <li>Then we call 'onDoneClick' function.</li>
    * <li>Then we remove the backbutton event listener that we set in the constructor.</li>
    * <li>Then we navigate to PreviewPage (from src/containers/PreviewPage.js).</li>
    * </ul>
    */
    storeCustomisedPartsImagesInStoreAndRedirectToPreviewPage = () => {
        let partFilenamesAndImagesArray = this.partFilenamesAndImagesArray.slice();
        this.props.storeCustomisedPartImagesInStore(partFilenamesAndImagesArray);

        this.storePartNameArrayAndLeftRightCarouselDataInStore();
        this.onDoneClick();

        document.removeEventListener("backbutton", this.clearCustomisedImagesPartsArrayCarouselDataAndRemoveBackButtonEventListener);

        this.props.history.push('/preview');
    };

    /**
    * <ul style="list-style:none;">
    * <li> In this function we first save the customised parts in store, with the help of the function 'storeCustomisedPartImagesInStore'. </li>
    * <li>Then we call 'storePartNameArrayAndLeftRightCarouselDataInStore' function.</li>
    * <li>Then we call 'onDoneClick' function.</li>
    * <li>Then we remove the backbutton event listener that we set in the constructor.</li>
    * <li>Then we navigate to CheckoutPage (from src/containers/CheckoutPage.js).</li>
    * </ul>
    */
    storeCustomisedPartsImagesInStoreAndRedirectToCheckoutPage = () => {
        let partFilenamesAndImagesArray = this.partFilenamesAndImagesArray.slice();
        this.props.storeCustomisedPartImagesInStore(partFilenamesAndImagesArray);

        this.storePartNameArrayAndLeftRightCarouselDataInStore();
        this.onDoneClick();

        document.removeEventListener("backbutton", this.clearCustomisedImagesPartsArrayCarouselDataAndRemoveBackButtonEventListener);

        this.props.history.push('/checkout');
    }

    /**
    * <ul style="list-style:none;">
    * <li> This is the render function of our class. </li>
    * </ul>
    */
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

/**
* <ul style="list-style:none;">
* <li> Here we map the properties we have in store to props of this class.</li>
* </ul>
*/
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

        /**
        * <ul style="list-style:none;">
        * <li> In this function we store the customised part's images to the store. </li>
        * </ul>
        */
        storeCustomisedPartImagesInStore: (payload) => {
            dispatch({
                type: actionTypes.STORE_CUSTOMISED_PARTS_IMAGES,
                payload: {
                    customisedPartsImages: payload
                }
            });
        },
        /**
        * <ul style="list-style:none;">
        * <li> In this function we store the part names and left-right carousel data in store. </li>
        * </ul>
        */
        storePartNameArrayAndLeftRightCarouselData: (partNamesArray, carouselData) => {
            dispatch({
                type: actionTypes.STORE_PART_NAME_ARRAY_AND_LEFT_RIGHT_CAROUSEL_DATA,
                payload: {
                    visualComposerPartNamesArray: partNamesArray,
                    visualComposerLeftRightCarouselData: carouselData
                }
            })
        },
        /**
        * <ul style="list-style:none;">
        * <li> In this function we clear the customised images, part names images, left-right carousel data, and the selected graphic price from store.</li>
        * </ul>
        */
        clearCustomisedImagesPartsArrayCarouselDataAndPriceFromStore: () => {
            dispatch({
                type: actionTypes.CLEAR_CUSTOMISED_IMAGES_AND_PARTS_ARRAY_AND_CAROUSEL_DATA_AND_PRICE
            })
        }
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisualComposerColorCustomiser));