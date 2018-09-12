import React, { Component } from 'react';
import { connect } from 'react-redux';
import base64 from 'base-64';
import utf8 from 'utf8';
import $ from 'jquery';

import * as appContants from '../../constants/AppConstants'
import PartNameCarouselComponent from './PartNameCarouselComponent/PartNameCarouselComponent';
import styles from './VisualComposerColorCustomiser.css';
import * as util from '../../util/Util';
import BottomControls from './BottomControls/BottomControls';
import LeftRightCarousel from './LeftRightCarousel/LeftRightCarousel';
import * as actionTypes from '../../store/actionTypes';


class VisualComposerColorCustomiser extends Component {

    leftRightCarouselData = ["Left Side", "Right Side"];
    partNameCarouselCurrentSelectedIndex = 0;
    leftRightCarouselCurrentSelectedIndex;

    partFilenamesAndImagesArray = [];
    partNamesArray = [];
    bikeSVGFilenamesAndImagesArray = [];
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
                height: `${(10 / 100) * (this.remainingHeight)}px`
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
    }


    fetchAllPartAndWholeBikeSVGImageNames = () => {

        this.props.images.forEach((el) => {


            if (!el.isBikeSVG) {
                if (el.category === this.props.selectedCategory && el.brand === this.props.selectedBrand && el.year === this.props.selectedYear && el.model === this.props.selectedModel && el.graphic === this.props.selectedGraphic && el.partname) {

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
            else {
                this.bikeSVGFilenamesAndImagesArray.push(el.filename);
            }
        }
        )

    };

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

    addClickEventListenerOnLeftElements = (element) => {
        if (element.nodeName === "path" || element.nodeName === "rect" || element.nodeName === "circle" || element.nodeName === "ellipse" || element.nodeName === "line" || element.nodeName === "polygon") {
            element.addEventListener("click", () => {
                this.removeBorderAroundCurrentlySelectedElement(element);
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

    fetchAllPartSVGImages = () => {
        let arrayOfPartImagePromises = [], responseCounter = 0;
        this.partFilenamesAndImagesArray.forEach((el) => {
            if (el.leftImageName) {
                arrayOfPartImagePromises.push(util.getBase64OfImage(`${appContants.LINK_TO_ROOT_PATH_OF_IMAGES}${el.leftImageName}`))
            }
            if (el.rightImageName) {
                arrayOfPartImagePromises.push(util.getBase64OfImage(`${appContants.LINK_TO_ROOT_PATH_OF_IMAGES}${el.rightImageName}`))
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
                        bytes = base64.decode(new Buffer(response[responseCounter].data, 'binary').toString('base64'));
                        el.leftImageAsString = utf8.decode(bytes);
                        responseCounter++;
                    }

                    if (el.rightImageName) {
                        bytes = base64.decode(new Buffer(response[responseCounter].data, 'binary').toString('base64'));
                        el.rightImageAsString = utf8.decode(bytes);
                        responseCounter++;
                    }
                })

                this.convertAllPartsImagesToParsableObjectsAndStore();
                this.populatePartNameAndLeftRightCarouselData();

                // document.getElementsByClassName(styles.heightOfImageParentDiv)[0].appendChild(this.partFilenamesAndImagesArray[1].rightImageObject)
                // document.getElementsByTagName("svg")[0].style.transform = "rotate(90deg)";
                // document.getElementsByTagName("svg")[0].style.height = `${$(`.${styles.heightOfImageParentDiv}`).width()}px`;

            })
    };

    populatePartNameAndLeftRightCarouselData = () => {
        this.setState({
            partNameCarouselData: this.partNamesArray,
            leftRightCarouselData: this.leftRightCarouselData
        });

        this.renderFirstImageFound();
    }

    componentDidMount() {
        this.fetchAllPartAndWholeBikeSVGImageNames();
        this.fetchAllPartSVGImages();
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
        this.selectedElement.style.fill = event.target.value;
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

    storeCustomisedPartsImagesInStoreAndRedirectToPreviewPage = () => {
        let partFilenamesAndImagesArray = this.partFilenamesAndImagesArray.slice();
        this.props.storeCustomisedPartImagesInStore(partFilenamesAndImagesArray);

    };

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
                        <BottomControls previewClick={this.storeCustomisedPartsImagesInStoreAndRedirectToPreviewPage} resetClick={this.onResetClick} colorOfInput={this.state.colorOfInput} changeIsNextEnable={this.changeIsNextEnable} isNextEnable={this.state.isNextEnable} doneClick={this.onDoneClick} colorChanged={this.onColorChanged} controlDivStyle={this.state.controlsDivStyle} />
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
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(VisualComposerColorCustomiser);