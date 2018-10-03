import React, { Component } from 'react';
import { connect } from 'react-redux';
import base64 from 'base-64';
import utf8 from 'utf8';

import * as appConstants from '../../constants/AppConstants';
import * as util from '../../util/Util';
import styles from './PreparePrintFileStoreItAndPay.css';
import * as AWSServicesManagement from '../../util/AWSServicesManagement';

class PreparePrintFileStoreItAndPay extends Component {

    topMargin = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    printSVGFileName = null;
    printImageAsString;
    printImageObject;

    constructor(props) {

        super(props);

        this.state = {
            content: (
                <div className={`d-flex justify-content-center ${styles.loaderParentDiv}`}>
                    {util.circularProgress()}
                </div>
            )
        };
    }

    mapCustomisedImagesColorsToPreviewImage = (element) => {
        if (element.style.fill) {
            if (this.printImageObject.getElementById(element.id)) {

                this.printImageObject.getElementById(element.id).style.fill = element.style.fill;
            }
        }
    }

    customisePrintFileForUpload = () => {
        let parser = new DOMParser();

        this.printImageObject = parser.parseFromString(this.printImageAsString, "image/svg+xml").getElementsByTagName("svg")[0];

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
    }

    componentDidMount() {

        this.props.images.forEach((el) => {
            if (el.category === this.props.selectedCategory && el.brand === this.props.selectedBrand && el.year === this.props.selectedYear && el.model === this.props.selectedModel && el.graphic === this.props.selectedGraphic && !el.isBikeSVG && el.isPrintSVG) {
                this.printSVGFileName = el.filename;
                return;
            }
        })

        AWSServicesManagement.getSVGImageFromS3(this.props.userJWTToken, `${appConstants.LINK_TO_ROOT_PATH_OF_CUSTOMIZABLE_IMAGES}${this.printSVGFileName}`)
            .then((imageData) => {
                let bytes = base64.decode(new Buffer(imageData, 'binary').toString('base64'));
                this.printImageAsString = utf8.decode(bytes);

                this.customisePrintFileForUpload();

                AWSServicesManagement.storeImageInS3(this.props.userJWTToken, this.printImageObject.outerHTML, `${appConstants.LINK_TO_ROOT_PATH_OF_PRINT_IMAGES}${this.props.userEmailId}/${new Date().valueOf()}.svg`)
                    .then(() => {
                        this.setState({
                            content: ""
                        });
                        AWSServicesManagement.executeLambdaMakePaymentAndStoreOrderDetailsInDynamoDB(this.props.userJWTToken, `{"test": "Hi Lambda! From Bhuvan!"}`)
                            .then((response) => {

                                let payload = JSON.parse(response.Payload);

                                if (payload.hasOwnProperty('errorMessage')) {
                                    console.log("Promise resolved but recieved error.", payload.errorMessage);
                                }
                                else {
                                    console.log("Promise resolved with no error.", payload);
                                }
                            })
                            .catch((err) => {
                                console.log("Error Lambda", err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
    }

    render() {
        return (
            <div style={this.topMargin}>
                {this.state.content}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userJWTToken: state.userJWTToken,
        images: state.images,
        selectedCategory: state.selectedCategory,
        selectedBrand: state.selectedBrand,
        selectedYear: state.selectedYear,
        selectedModel: state.selectedModel,
        selectedGraphic: state.selectedGraphic,
        customisedPartsImages: state.customisedPartsImages,
        userEmailId: state.userEmailId
    };
};

export default connect(mapStateToProps)(PreparePrintFileStoreItAndPay);