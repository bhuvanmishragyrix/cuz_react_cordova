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


class VisualComposerColorCustomiser extends Component {

    partFilenamesAndImagesArray = [];
    partNamesArray = [];
    bikeSVGFilenamesAndImagesArray = [];
    remainingHeight;

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
            carouselData: null
        };
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
                            if (fileNamesArrayElement.partname === el.partname && !fileNamesArrayElement.hasOwnProperty("left")) {
                                console.log("Entered Left");
                                fileNamesArrayElement.left = el.filename;
                            }
                        });
                    }
                    else if (el.leftOrRight === "Right") {
                        this.partFilenamesAndImagesArray.forEach((fileNamesArrayElement) => {
                            if (fileNamesArrayElement.partname === el.partname && !fileNamesArrayElement.hasOwnProperty("right")) {
                                console.log("Entered Right");
                                fileNamesArrayElement.right = el.filename;
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

        // let bytes = base64.decode(new Buffer(response.data, 'binary').toString('base64'));
        // let image = utf8.decode(bytes);

        console.log("PartFileNameArray", this.partFilenamesAndImagesArray);
        console.log("BikeSVG FileNamesArray", this.bikeSVGFilenamesAndImagesArray);


    };

    convertAllPartsImagesToParsableObjectsAndStore = () => {

        let parser = new DOMParser();
        let partFilenamesAndImagesArray;

        partFilenamesAndImagesArray = this.partFilenamesAndImagesArray.map((el) => {

            let leftImageObject = null, rightImageObject = null, toreturn;

            toreturn = { ...el };

            if (el.leftImage) {
                leftImageObject = parser.parseFromString(el.leftImage, "image/svg+xml").getElementsByTagName("svg")[0];
                toreturn = {
                    ...toreturn,
                    leftImageObject: leftImageObject
                }
            }

            if (el.righImage) {
                rightImageObject = parser.parseFromString(el.righImage, "image/svg+xml").getElementsByTagName("svg")[0];
                toreturn = {
                    ...toreturn,
                    rightImageObject: rightImageObject
                }
            }

            return toreturn;
        });

        this.partFilenamesAndImagesArray = partFilenamesAndImagesArray;
    }

    fetchAllPartSVGImages = () => {
        let arrayOfPartImagePromises = [], responseCounter = 0;
        this.partFilenamesAndImagesArray.forEach((el) => {
            if (el.left) {
                arrayOfPartImagePromises.push(util.getBase64OfImage(`${appContants.LINK_TO_ROOT_PATH_OF_IMAGES}${el.left}`))
            }
            if (el.right) {
                arrayOfPartImagePromises.push(util.getBase64OfImage(`${appContants.LINK_TO_ROOT_PATH_OF_IMAGES}${el.right}`))
            }
        })

        Promise.all(arrayOfPartImagePromises)
            .then((response) => {
                console.log(response)
                this.partFilenamesAndImagesArray.forEach((el, index) => {
                        let bytes;
                        if (el.left) {
                            bytes = base64.decode(new Buffer(response[responseCounter].data, 'binary').toString('base64'));
                            el.leftImage = utf8.decode(bytes);
                            responseCounter++;
                        }

                        if (el.right) {
                            bytes = base64.decode(new Buffer(response[responseCounter + 1].data, 'binary').toString('base64'));
                            el.rightImage = utf8.decode(bytes);
                            responseCounter++;
                        }
                })

                this.convertAllPartsImagesToParsableObjectsAndStore();

                console.log(this.partFilenamesAndImagesArray)

                document.getElementsByClassName(styles.heightOfImageParentDiv)[0].appendChild(this.partFilenamesAndImagesArray[0].leftImageObject)
                // document.getElementsByTagName("svg")[0].style.transform = "rotate(90deg)";
                // document.getElementsByTagName("svg")[0].style.height = `${$(`.${styles.heightOfImageParentDiv}`).width()}px`;

                console.log("SVG Height", $('svg').height());
                console.log("SVG Width", $('svg').width());
            })
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

        this.fetchAllPartAndWholeBikeSVGImageNames();
        this.fetchAllPartSVGImages();

        return (
            <div className={``} style={this.state.wrapperDivStyle}>
                <div className={`bg-success p-3`} style={this.state.imageAndCarouselDivStyle}>
                    <div className={`${styles.carouselParent}`}>
                        <PartNameCarouselComponent carouselData={this.state.carouselData} />
                    </div>
                    <div className={`${styles.leftRightSelectionParentDiv}`}>

                    </div>
                    <div className={`${styles.heightOfImageParentDiv}`}>

                    </div>
                </div>
                <div className={``} style={this.state.controlsDivStyle}>
                    <BottomControls controlDivStyle={this.state.controlsDivStyle} />
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