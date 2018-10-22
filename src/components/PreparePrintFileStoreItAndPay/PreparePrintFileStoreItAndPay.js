import React, { Component } from 'react';
import { connect } from 'react-redux';
import base64 from 'base-64';
import utf8 from 'utf8';
import { withRouter } from 'react-router-dom';

import * as appConstants from '../../constants/AppConstants';
import * as util from '../../util/Util';
import styles from './PreparePrintFileStoreItAndPay.css';
import * as AWSServicesManagement from '../../util/AWSServicesManagement';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PaymentDetailsFormReactStripe from './PaymentDetailsFormReactStripe/PaymentDetailsFormReactStripe';
import * as actionTypes from '../../store/actionTypes';

class PreparePrintFileStoreItAndPay extends Component {

    topMargin = {
        marginTop: `${appConstants.HEIGHT_OF_THREE_ELEMENT_TAB_BAR + appConstants.TOP_MARGIN_FOR_THREE_ELEMENT_TABBAR_PAGES}px`
    }

    printSVGFileName = null;
    printImageAsString;
    printImageObject;
    filenameOfUploadedImage;

    /**
    * <ul style="list-style:none;">
    * <li> In the constructor we set the circular Progress to show in the middle of our page. </li>
    * <li> We then set the initial value (equal to null) of some state variables. </li>
    * </ul>
    */
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
            paymentPhone: null,
            paymentAddress: null,
            paymentState: null,
            paymentPostalCode: null
        };
    }

    /**
    * <ul style="list-style:none;">
    * <li> Here we map the color customisations done in VisualComposerColorCustomiser to print image for a particular element. </li>
    * </ul>
    */
    mapCustomisedImagesColorsToPreviewImage = (element) => {
        if (element.style.fill) {
            if (this.printImageObject.getElementById(element.id)) {

                this.printImageObject.getElementById(element.id).style.fill = element.style.fill;
            }
        }
    }

    /**
    * <ul style="list-style:none;">
    * <li> Here we call the function 'mapCustomisedImagesColorsToPreviewImage' for each element in customised parts images saved in store. </li>
    * </ul>
    */
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

    /**
    * <ul style="list-style:none;">
    * <li> This function is called when onChange of the Name input field is triggered. We set the name input field's value to the state variable 'paymentName' here.</li>
    * </ul>
    */
    onNameChange = (evt) => {
        this.setState({
            paymentName: evt.target.value
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> This function is called when onChange of the City input field is triggered. We set the name input field's value to the state variable 'paymentCity' here.</li>
    * </ul>
    */
    onCityChange = (evt) => {
        this.setState({
            paymentCity: evt.target.value
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> This function is called when onChange of the Country input field is triggered. We set the name input field's value to the state variable 'paymentCountry' here.</li>
    * </ul>
    */
    onCountryChange = (evt) => {
        this.setState({
            paymentCountry: evt.target.value
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> This function is called when onChange of the Phone input field is triggered. We set the name input field's value to the state variable 'paymentPhone' here.</li>
    * </ul>
    */
    onPhoneChange = (evt) => {
        this.setState({
            paymentPhone: evt.target.value
        });
    }

    /**
    * <ul style="list-style:none;">
    * <li> This function is called when onChange of the Address input field is triggered. We set the name input field's value to the state variable 'paymentAddress' here.</li>
    * </ul>
    */
    onAddressChange = (evt) => {
        this.setState({
            paymentAddress: evt.target.value
        });
    };

    /**
    * <ul style="list-style:none;">
    * <li> This function is called when onChange of the State input field is triggered. We set the name input field's value to the state variable 'paymentState' here.</li>
    * </ul>
    */
    onStateChange = (evt) => {
        this.setState({
            paymentState: evt.target.value
        });
    };

    /**
    * <ul style="list-style:none;">
    * <li> This function is called when onChange of the Postal Code input field is triggered. We set the name input field's value to the state variable 'paymentPostalCode' here.</li>
    * </ul>
    */
    onPostalCodeChange = (evt) => {
        this.setState({
            paymentPostalCode: evt.target.value
        });
    };

    /**
    * <ul style="list-style:none;">
    * <li> This function is triggered when the user clicks on Retry (after a failed payment attempt).</li>
    * </ul>
    */
    onRetryClick = () => {
        this.setState({
            content: (
                <StripeProvider apiKey={appConstants.STRIPE_PUBLISHABLE_KEY}>
                    <div className="example">
                        <Elements>
                            <PaymentDetailsFormReactStripe
                                onNameChange={this.onNameChange}
                                onCityChange={this.onCityChange}
                                onPhoneChange={this.onPhoneChange}
                                sendTokenToServerAndCompletePayment={this.sendTokenToServerAndCompletePayment}
                                email={this.props.userEmailId}
                                price={this.props.selectedGraphicPrice}
                                onAddressChange={this.onAddressChange}
                                onStateChange={this.onStateChange}
                                onPostalCodeChange={this.onPostalCodeChange}
                            />
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

    /**
    * <ul style="list-style:none;">
    * <li> This function resets the selection data saved in store, and </li>
    * <li> Pops the history stack 5 times, hence redirect to the category select page (from src/containers/CategorySelectPage.js). </li>
    * </ul>
    */
    redirectToHomePage = () => {
        this.props.resetSelectionDataInStore();
        this.props.history.go(-5);
    }

    /**
    * <ul style="list-style:none;">
    * <li> In this function we send the token data generated on client side to our server (stripe payment client side token). </li>
    * <li> Here we also do validations on the input fields. </li>
    * <li> We execute the lambda function present on AWS to complete payment, and </li>
    * <li> Do the success and error handling both here. </li>
    * </ul>
    */
    sendTokenToServerAndCompletePayment = (tokenData) => {

        if (tokenData.token) {

            console.log(this.state.paymentName, this.state.paymentCity, this.state.paymentCountry, this.state.paymentPhone);

            if (this.state.paymentName && this.state.paymentName.length > 0 &&
                this.state.paymentCity && this.state.paymentCity.length > 0 &&
                this.state.paymentPhone && this.state.paymentPhone.length > 0 &&
                this.state.paymentAddress && this.state.paymentAddress.length > 0 &&
                this.state.paymentState && this.state.paymentState.length > 0 &&
                this.state.paymentPostalCode && this.state.paymentPostalCode.length > 0) {

                console.log("Token Data", tokenData);
                let tokenAndDataToSendToServer = {
                    ...tokenData,
                    name: this.state.paymentName,
                    city: this.state.paymentCity,
                    phone: this.state.paymentPhone,
                    email: this.props.userEmailId,
                    printFilename: `${this.filenameOfUploadedImage}.svg`,
                    orderStatus: "Order Placed",
                    priceToChargeInEuroCents: this.props.selectedGraphicPrice,
                    address: this.state.paymentAddress,
                    state: this.state.paymentState,
                    postalCode: this.state.paymentPostalCode
                };
                AWSServicesManagement.executeLambdaMakePaymentAndStoreOrderDetailsInDynamoDB(this.props.userJWTToken, JSON.stringify(tokenAndDataToSendToServer))
                    .then((response) => {
                        console.log("Reached Here.", response);
                        let error = "";
                        let payload = JSON.parse(response.Payload);

                        if (payload.hasOwnProperty('errorMessage')) {
                            console.log("Promise resolved but recieved error.", JSON.parse(payload.errorMessage));

                            let errorMessage = JSON.parse(payload.errorMessage);

                            if (errorMessage.type === "api_connection_error" || errorMessage.type === "authentication_error" ||
                                errorMessage.type === "StripeCardError" || errorMessage.type === "validation_error") {
                                error = errorMessage.message;
                            }

                            this.setState({
                                paymentName: null,
                                paymentCity: null,
                                paymentPhone: null,
                                address: null,
                                state: null,
                                postalCode: null,
                                content: (
                                    <div className={`text-center`}>
                                        <p className={`text-center text-danger ${styles.errorText}`}>Payment Error <br /><br />
                                            {error}</p>
                                        {this.retryErrorText}
                                    </div>
                                )
                            });
                        }
                        else {
                            let payloadData = JSON.parse(payload);
                            console.log("Promise resolved with no error.", payloadData);
                            let filenameWithoutExtension = payloadData.metadata.filename.split('.')[0];
                            console.log("File Name without Extension", filenameWithoutExtension);

                            this.setState({
                                content: (
                                    <div>
                                        <p className={`text-success ${styles.errorText} text-center`}>Payment Success</p>
                                        <p className={`${styles.errorText} text-center`}>
                                            Your order reference Id : {`${payloadData.metadata.email}/${filenameWithoutExtension}`} <br /> <br />
                                            Transaction Id : {`${payloadData.balance_transaction}`} <br /><br />
                                            Amount Paid: {`${payloadData.amount / 100} Euros`}<br /><br />
                                            A receipt of the order has been sent to : {`${payloadData.receipt_email}`}
                                        </p>
                                        <br />
                                        <p onClick={this.redirectToHomePage} className={`text-center`}><u className={`${styles.errorText} text-primary text-center`}>Go to Home Page</u></p>
                                    </div>
                                )
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
                let phoneError = (<p className={`text-center ${styles.errorText} text-danger`}>Phone field cannot be empty</p>);
                let addressError = (<p className={`text-center ${styles.errorText} text-danger`}>Address field cannot be empty</p>);
                let stateError = (<p className={`text-center ${styles.errorText} text-danger`}>State field cannot be empty</p>);
                let postalCodeError = (<p className={`text-center ${styles.errorText} text-danger`}>Postal Code field cannot be empty</p>);
                let errorMessage = [];

                if (!(this.state.paymentName && this.state.paymentName.length > 0)) {
                    errorMessage.push(nameError);
                }
                if (!(this.state.paymentAddress && this.state.paymentAddress.length > 0)) {
                    errorMessage.push(addressError);
                }
                if (!(this.state.paymentCity && this.state.paymentCity.length > 0)) {
                    errorMessage.push(cityError);
                }
                if (!(this.state.paymentState && this.state.paymentState.length > 0)) {
                    errorMessage.push(stateError);
                }
                if (!(this.state.paymentPostalCode && this.state.paymentPostalCode.length > 0)) {
                    errorMessage.push(postalCodeError);
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
                paymentName: null,
                paymentCity: null,
                paymentPhone: null,
                address: null,
                state: null,
                postalCode: null,
                content: (
                    <div className={`text-center`}>
                        <p className={`text-center text-danger ${styles.errorText}`}>{tokenData.error.message}</p>
                        {this.retryErrorText}
                    </div>
                )
            });
        }
    }

    /**
    * <ul style="list-style:none;">
    * <li> Here we retreive the file name of the appropriate printSVG. </li>
    * <li> Here we then fetch the print SVG from AWS S3, and convert it to string. </li>
    * <li> We then call the function 'customisePrintFileForUpload'. </li>
    * <li> We then store the customised image on AWS S3 under the folder having name of registered email address of user, and </li>
    * <li> And having filename of the current timestamp. </li>
    * <li> On successful storage of file on AWS S3, we present the user with the page where he can enter payment details and complete payment. </li>
    * </ul>
    */
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

                this.filenameOfUploadedImage = new Date().valueOf();

                AWSServicesManagement.storeImageInS3(this.props.userJWTToken, this.printImageObject.outerHTML, `${appConstants.LINK_TO_ROOT_PATH_OF_PRINT_IMAGES}${this.props.userEmailId}/${this.filenameOfUploadedImage}.svg`)
                    .then(() => {
                        this.setState({
                            content: (
                                <StripeProvider apiKey={appConstants.STRIPE_PUBLISHABLE_KEY}>
                                    <div className="example">
                                        <Elements>
                                            <PaymentDetailsFormReactStripe
                                                onNameChange={this.onNameChange}
                                                onCityChange={this.onCityChange}
                                                onPhoneChange={this.onPhoneChange}
                                                sendTokenToServerAndCompletePayment={this.sendTokenToServerAndCompletePayment}
                                                email={this.props.userEmailId}
                                                price={this.props.selectedGraphicPrice}
                                                onAddressChange={this.onAddressChange}
                                                onStateChange={this.onStateChange}
                                                onPostalCodeChange={this.onPostalCodeChange} />
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

    /**
    * <ul style="list-style:none;">
    * <li> This is the render function of our class </li>
    * </ul>
    */
    render() {
        return (
            <div style={this.topMargin}>
                {this.state.content}
            </div>
        );
    }
}

/**
* <ul style="list-style:none;">
* <li> Here we map the attributes in store to props in our class. </li>
* </ul>
*/
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

const mapDispatchToProps = (dispatch) => {
    return {
        /**
        * <ul style="list-style:none;">
        * <li> With the help of this function we reset the selection data saved in store. </li>
        * </ul>
        */
        resetSelectionDataInStore: () => {
            dispatch({ type: actionTypes.RESET_SELECTION_DATA_AFTER_SUCCESSFUL_PAYMENT });
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PreparePrintFileStoreItAndPay));