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

    navigateToSignUpPage = () => {
        this.props.history.replace('/signUp');
    };

    navigateToCategorySelectPage = () => {
        this.props.history.replace('/parentForThreeElementTabBarScreens/categorySelectPage');
    };

    onEmailChange = (evt) => {
        this.email = evt.target.value;
    }

    onPasswordChange = (evt) => {
        this.password = evt.target.value;
    }

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

                            this.navigateToCategorySelectPage();

                            this.props.storeProductsAndImagesJSONData(JSON.parse(jsonData));
                        })
                        .catch((err) => { console.log("Error", err) });
                })
                .catch((err) => {
                    if (err.message === "Incorrect username or password.") {
                        errorText = err.message;
                    }
                    else if (err.message === "User does not exist.") {
                        errorText = "Incorrect username or password.";
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
            <button onClick={this.navigateToSignUpPage} className={`btn btn-light form-control mt-4 ${styles.signUp}`}>Sign up</button>
        </div>
    );

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

    render() {
        return (
            <div className={`mx-3 mb-2`}>

                {this.state.content}

            </div>
        );
    }

};

const mapstateToProps = (state) => {
    return {
        userJWTToken: state.userJWTToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeUserJWTTokenInStore: (token) => {
            dispatch({
                type: actionTypes.STORE_USER_JWT_TOKEN,
                payload: { userJWTToken: token }
            })
        },
        storeProductsAndImagesJSONData: (data) => {
            dispatch({ type: actionTypes.STORE_FETCHED_PRODUCTS_AND_IMAGES_JSON_DATA, payload: data })
        },
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