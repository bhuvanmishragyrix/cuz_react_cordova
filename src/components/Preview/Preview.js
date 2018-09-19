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

    constructor(props) {
        super(props);

        this.remainingHeight = 0.9 * window.screen.height - appContants.HEIGHT_TO_SUBTRACT_FROM_WINDOW_SCREEN_HEIGHT;

        this.state = {
            loaderContent: util.circularProgress(),
            wrapperDivStyle: {
                height: `${this.remainingHeight}px`
            },
            imageParent: {

            }
        };

        this.previewImageFileName = this.props.images.filter((el) => {
            if (el.isBikeSVG) {
                return true;
            }
        });
    }

    mapCustomisedImagesColorsToPreviewImage = (element) => {
        if (element.style.fill) {
            if (this.previewImageObject.getElementById(element.id)) {
                this.previewImageObject.getElementById(element.id).style.fill = element.style.fill;
            }
        }
    }

    componentDidMount() {

        util.getBase64OfImage(`${appContants.LINK_TO_ROOT_PATH_OF_IMAGES}${this.previewImageFileName[0].filename}`)
            .then((response) => {
                // screen.orientation.lock('landscape').then(() => {
                //     this.setState({
                //         wrapperDivStyle:{
                //             height: `${this.remainingWidth}px`,
                //             width: `${this.remainingHeight}px`
                //         },
                //         loaderContent: ""
                //     });

                // }, function error(errMsg) {
                //     console.log("Error locking the orientation :: " + errMsg);
                // });


                screen.orientation.lock('landscape').then(() => {

                    this.setState({
                        loaderContent: "",
                        wrapperDivStyle: {
                            height: window.screen.width,
                            imageParent: window.screen.width
                        }
                    }, () => {
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
                        $('svg')[0].setAttribute("height", 0.7 * window.screen.width);
                        // document.getElementsByTagName("svg")[0].classList.add(styles.svg);
                        AndroidFullScreen.leanMode(() => { console.log("Lean Mode Successful"); }, () => { console.log("Lean Mode Error") });
                    });

                }, function error(errMsg) {
                    console.log("Error locking the orientation :: " + errMsg);
                });

            });
    }

    render() {
        return (
            <div style={this.state.wrapperDivStyle} id={styles.parentOfImage} className={`d-flex flex-column align-items-center justify-content-between pb-1`}>
            <RightLeftSelectCarousel carouselData={this.leftRightCarouselData}/>
                <div style={this.state.imageParent} className={``}>
                    {this.state.loaderContent}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.images,
        selectedGraphic: state.selectedGraphic,
        customisedPartsImages: state.customisedPartsImages
    };
};

export default connect(mapStateToProps)(Preview);