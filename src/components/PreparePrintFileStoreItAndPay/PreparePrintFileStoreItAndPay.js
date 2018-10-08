import React, { Component } from 'react';
import { connect } from 'react-redux';
import base64 from 'base-64';
import utf8 from 'utf8';

import * as appConstants from '../../constants/AppConstants';
import * as util from '../../util/Util';
import styles from './PreparePrintFileStoreItAndPay.css';
import * as AWSServicesManagement from '../../util/AWSServicesManagement';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PaymentDetailsFormReactStripe from './PaymentDetailsFormReactStripe/PaymentDetailsFormReactStripe';

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
            ),
            paymentName: null,
            paymentCity: null,
            paymentCountry: null,
            paymentPhone: null
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

    onNameChange = (evt) => {
        this.setState({
            paymentName: evt.target.value
        });
    }
    onCityChange = (evt) => {
        this.setState({
            paymentCity: evt.target.value
        });
    }
    onCountryChange = (evt) => {
        this.setState({
            paymentCountry: evt.target.value
        });
    }
    onPhoneChange = (evt) => {
        this.setState({
            paymentPhone: evt.target.value
        });
    }

    onRetryClick = () => {
        this.setState({
            content: (
                <StripeProvider apiKey="pk_test_J5yleHQPLNqdSIf8zNaYIvOR">
                    <div className="example">
                        <Elements>
                            <PaymentDetailsFormReactStripe onNameChange={this.onNameChange} onCityChange={this.onCityChange} onCountryChange={this.onCountryChange} onPhoneChange={this.onPhoneChange} sendTokenToServerAndCompletePayment={this.sendTokenToServerAndCompletePayment} email={this.props.userEmailId} price={this.props.selectedGraphicPrice} />
                        </Elements>
                    </div>
                </StripeProvider>
            )
        });
    }

    retryErrorText = (
        <div onClick={this.onRetryClick} className={`text-center`}>
            <p className={`text-center p-0 m-0 ${styles.errorText}`}>Retry</p>
            <i className="fa fa-refresh p-0 m-0" aria-hidden="true"></i>
        </div>
    );

    sendTokenToServerAndCompletePayment = (tokenData) => {

        if (tokenData.token) {

            console.log(this.state.paymentName, this.state.paymentCity, this.state.paymentCountry, this.state.paymentPhone);

            if (this.state.paymentName && this.state.paymentName.length > 0 &&
                this.state.paymentCity && this.state.paymentCity.length > 0 &&
                this.state.paymentCountry && this.state.paymentCountry.length > 0 &&
                this.state.paymentPhone && this.state.paymentPhone.length > 0) {

                console.log(tokenData);
                AWSServicesManagement.executeLambdaMakePaymentAndStoreOrderDetailsInDynamoDB(this.props.userJWTToken, JSON.stringify(tokenData))
                    .then((response) => {
                        console.log("Reached Here.", response);
                        let payload = JSON.parse(response.Payload);

                        if (payload.hasOwnProperty('errorMessage')) {
                            console.log("Promise resolved but recieved error.", JSON.parse(payload.errorMessage));
                            this.setState({
                                content: <p className="text-danger">Payment Error</p>
                            });
                        }
                        else {
                            console.log("Promise resolved with no error.", JSON.parse(payload));
                            this.setState({
                                content: <p className="text-success">Payment Success</p>
                            });
                        }


                    })
                    .catch((err) => {
                        console.log("Error Lambda", err);
                    });

            }
            else {
                let nameError = (<p className={`text-center ${styles.errorText} text-danger`}>Name field cannot be empty</p>);
                let cityError = (<p className={`text-center ${styles.errorText} text-danger`}>City field cannot be empty</p>);
                let countryError = (<p className={`text-center ${styles.errorText} text-danger`}>Country field cannot be empty</p>);
                let phoneError = (<p className={`text-center ${styles.errorText} text-danger`}>Phone field cannot be empty</p>);
                let errorMessage = [];

                if (!(this.state.paymentName && this.state.paymentName.length > 0)) {
                    errorMessage.push(nameError);
                }
                if (!(this.state.paymentCity && this.state.paymentCity.length > 0)) {
                    errorMessage.push(cityError);
                }
                if (!(this.state.paymentCountry && this.state.paymentCountry.length > 0)) {
                    errorMessage.push(countryError);
                }
                if (!(this.state.paymentPhone && this.state.paymentPhone.length > 0)) {
                    errorMessage.push(phoneError);
                }
                errorMessage.push(this.retryErrorText);
                this.setState({
                    content: errorMessage
                });
            }

        }
        else if (tokenData.error) {
            this.setState({
                content: (
                    <div className={`text-center`}>
                        <p className={`text-center text-danger ${styles.errorText}`}>{tokenData.error.message}</p>
                        {this.retryErrorText}
                    </div>
                )
            });
        }
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
                            content: (
                                <StripeProvider apiKey="pk_test_J5yleHQPLNqdSIf8zNaYIvOR">
                                    <div className="example">
                                        <Elements>
                                            <PaymentDetailsFormReactStripe onNameChange={this.onNameChange} onCityChange={this.onCityChange} onCountryChange={this.onCountryChange} onPhoneChange={this.onPhoneChange} sendTokenToServerAndCompletePayment={this.sendTokenToServerAndCompletePayment} email={this.props.userEmailId} price={this.props.selectedGraphicPrice} />
                                        </Elements>
                                    </div>
                                </StripeProvider>
                            )
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
        userEmailId: state.userEmailId,
        selectedGraphicPrice: state.selectedGraphicPrice
    };
};

export default connect(mapStateToProps)(PreparePrintFileStoreItAndPay);