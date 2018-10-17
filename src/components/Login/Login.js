import React, { Component } from 'react';
import styles from './Login.css';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import * as AWSUserManagement from '../../util/AWSUserManagement';
import * as util from '../../util/Util';
import ErrorDisplay from './ErrorDisplay/ErrorDisplay';
import * as actionTypes from '../../store/actionTypes';

import * as AWSServicesManagement from '../../util/AWSServicesManagement';
import * as AppConstants from '../../constants/AppConstants';
import base64 from 'base-64';
import utf8 from 'utf8';


class Login extends Component {

    email;
    password;

    /**
     * This function navigates to '/signUp' route, i.e. SignUpPage (from 'src/containers/SignUpPage.js').
    */
    navigateToSignUpPage = () => {
        this.props.history.replace('/signUp');
    };

    /**
     * This function navigates to '/parentForThreeElementTabBarScreens/categorySelectPage' route, i.e. the CategorySelectPage.
    */
    navigateToCategorySelectPage = () => {
        this.props.history.replace('/parentForThreeElementTabBarScreens/categorySelectPage');
    };

    /**
    * On change of the email input field, this function sets the class variable 'this.email' to the current value in the email input field.
    * @param {Object} evt The event object that the input field gives us, on change on the input field value
    */
    onEmailChange = (evt) => {
        this.email = evt.target.value;
    }

    /**
    * On change of the password input field, this function sets the class variable 'this.password' to the current value in the password input field.
    * @param {Object} evt The event object that the input field gives us, on change on the input field value
    */
    onPasswordChange = (evt) => {
        this.password = evt.target.value;
    }

    /**
    * <ul style="list-style:none;">
    * <li> This function first of all replaces the login button on the login screen by a circular loader. </li>
    * <li> Then checks if the email or password fields are empty. If they are empty, it shows an error on the page. </li>
    * <li> If they are not empty, we try to authenticate the user using 'authenticateUser' function (from 'src/util/AWSUserManagement.js') </li>
    * <li> On successful authentication, we fetch the JSON file we have stored on AWS S3 that contains an entry for each image that is used in the application.</li> 
    * <li> We then save this JSON data to store, and then navigate to '/parentForThreeElementTabBarScreens/categorySelectPage' route with the help of a function.
    * <li> If the authentication fails, we display an appropriate error message on the screen.
    * </ul>
    */
    login = () => {

        let errorText = "An error occured. Please try again.";

        this.setState({
            content: (
                <div>
                    {this.loginHeader}
                    {this.inputs}
                    <div className={`text-center mt-3`}>
                        {util.circularProgress()}
                    </div>
                </div>
            )
        });

        if (!this.email || !this.password) {
            errorText = "Email or Password cannot be empty.";
            this.setState({
                content: (
                    <div>
                        <ErrorDisplay text={errorText} />
                        {this.inputs}
                        {this.loginButtonNewToCuzSignUpButton}
                    </div>
                )
            });
        }
        else {
            AWSUserManagement.authenticateUser(this.email, this.password)
                .then((jWTToken) => {
                    this.props.storeUserJWTTokenInStore(jWTToken);
                    this.props.storeUserEmailIdInStore(this.email);
                    AWSServicesManagement.getJSONFromS3(this.props.userJWTToken, AppConstants.FILE_NAME_OF_APP_JSON_FILE)
                        .then((data) => {
                            let bytes;
                            bytes = base64.decode(new Buffer(data, 'binary').toString('base64'));
                            let jsonData = utf8.decode(bytes);

                            try {
                                JSON.parse(jsonData);
                            }
                            catch (err) {
                                console.log("Error parsing the JSON Data returned from server.", err);
                            }

                            this.props.storeProductsAndImagesJSONData(JSON.parse(jsonData));

                            this.navigateToCategorySelectPage();
                        })
                        .catch((err) => { console.log("Error", err) });
                })
                .catch((err) => {
                    if (err.message === "Incorrect Email or password.") {
                        errorText = err.message;
                    }
                    else if (err.message === "User does not exist.") {
                        errorText = "Incorrect Email or password.";
                    }
                    else if (err.message === "User is not confirmed.") {
                        errorText = "Please verify email."
                    }
                    this.setState({
                        content: (
                            <div>
                                <ErrorDisplay text={errorText} />
                                {this.inputs}
                                {this.loginButtonNewToCuzSignUpButton}
                            </div>
                        )
                    });
                    console.log("Error Auth", err.message)
                });
        }
    }

    inputs = (
        <div>
            <label className={`${styles.labelText}`}>Email Id</label>
            <input onChange={this.onEmailChange} className={`form-control`} />
            <label className={`${styles.labelText} mt-2`}>Password</label>
            <input onChange={this.onPasswordChange} type={`password`} className={`form-control`} />
        </div>
    );

    loginHeader = (<p className={`${styles.loginHeader} text-center`}>Login</p>);

    loginButtonNewToCuzSignUpButton = (
        <div>
            <div className={`text-center mt-4`}>
                <button onClick={this.login} className={`btn btn-primary form-control`}>Login</button>
            </div>
            <div className={`d-flex justify-content-between align-items-center mt-4`}>
                <div className={`d-inline ${styles.lineDiv}`}></div>
                <p className={`d-inline ${styles.newToCuzText} m-0 p-0`}>New to CUZ?</p>
                <div className={`d-inline ${styles.lineDiv}`}></div>
            </div>
            <button onClick={this.navigateToSignUpPage} className={`btn btn-light form-control mt-4 ${styles.signUp}`}>Sign Up</button>
        </div>
    );

    /**
    * This is the constructor for this class, we set the content that we'll see on the screen, here in 'state'.
    * @param {Object} props These are the props the constructor receives
    */
    constructor(props) {
        super(props);

        this.state = {
            content: (
                <div>
                    {this.loginHeader}
                    {this.inputs}
                    {this.loginButtonNewToCuzSignUpButton}
                </div>
            )
        };
    }

    /**
    * This is the render function of this class.
    */
    render() {
        return (
            <div className={`mx-3 mb-2`}>

                {this.state.content}

            </div>
        );
    }

};

/**
 * In this function we map attributes that we have in store to props in the class.
 */
const mapstateToProps = (state) => {
    return {
        userJWTToken: state.userJWTToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        /**
        * This function stores the userJWTToken obtained on login to store.
        * @param {string} token The JWT token obtained on user login
        */
        storeUserJWTTokenInStore: (token) => {
            dispatch({
                type: actionTypes.STORE_USER_JWT_TOKEN,
                payload: { userJWTToken: token }
            })
        },
        /**
        * This function stores the images and products JSON data we have fetched from AWS S3 to the store.
        * @param {Object} data The Images and Products JSON data we have fetched from AWS S3
        */
        storeProductsAndImagesJSONData: (data) => {
            dispatch({ type: actionTypes.STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA, payload: data })
        },
        /**
        * This function stores the email Id of the logged in user to the store.
        * @param {string} email The email Id of the logged in user
        */
        storeUserEmailIdInStore: (email) => {
            dispatch({
                type: actionTypes.STORE_USER_EMAIL_ID_IN_STORE, payload: {
                    userEmailId: email
                }
            });
        }
    };
};

export default withRouter(connect(mapstateToProps, mapDispatchToProps)(Login));