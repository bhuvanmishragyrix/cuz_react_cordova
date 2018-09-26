import React, { Component } from 'react';
import styles from './SignUp.css';
import { withRouter } from 'react-router-dom';

import * as AWSUserManagement from '../../util/AWSUserManagement';
import * as util from '../../util/Util';
import ErrorDisplay from './ErrorDisplay/ErrorDisplay';
import { isNull } from 'util';

class SignUp extends Component {

    email;
    password;
    successText = (<div className={`${styles.signUpSuccessText} text-success`}>SignUp Successful. Please verify email to be able to login.</div>);
    signUpHeader = (<p className={`${styles.signUpHeader} text-center`}>SignUp</p>);

    onEmailChange = (evt) => {
        this.email = evt.target.value;
    };

    onPasswordChange = (evt) => {
        this.password = evt.target.value;
    };

    signUp = () => {

        let errorText = "An error has occured. Please try again.";

        this.setState({
            content: (
                <div>
                    {this.signUpHeader}
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
                        {this.signUpButtonAndAlreadyAMemberText}
                        {this.loginButton}
                    </div>
                )
            });
        }
        else if (this.password.length < 6) {
            errorText = "The length of the password must be atleast 6 characters.";
            this.setState({
                content: (
                    <div>
                        <ErrorDisplay text={errorText} />
                        {this.inputs}
                        {this.signUpButtonAndAlreadyAMemberText}
                        {this.loginButton}
                    </div>
                )
            });
        }
        else {
            AWSUserManagement.signUp(this.email, this.password)
                .then((result) => {
                    console.log("Success SignUp", result);
                    this.setState({
                        content: (
                            <div>
                                {this.successText}
                                {this.loginButton}
                            </div>
                        )
                    });
                })
                .catch((err) => {

                    if (err.message === "An account with the given email already exists.") {
                        errorText = err.message;
                    }

                    this.setState({
                        content: (
                            <div>
                                <ErrorDisplay text={errorText} />
                                {this.inputs}
                                {this.signUpButtonAndAlreadyAMemberText}
                                {this.loginButton}
                            </div>
                        )
                    });
                    console.log("Error SignUp", err.message);
                });
        }


        // AWS.config.region = 'us-east-2';

        // Configure the credentials provider to use your identity pool
        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //     IdentityPoolId: 'us-east-2:d77b718b-4c74-4938-a7ad-8c91d0dbcb41',
        // });

        // // Make the call to obtain credentials
        // AWS.config.credentials.get(function (err) {

        //     // Credentials will be available when this function is called.
        //     var accessKeyId = AWS.config.credentials.accessKeyId;
        //     var secretAccessKey = AWS.config.credentials.secretAccessKey;
        //     var sessionToken = AWS.config.credentials.sessionToken;

        //     console.log(err, accessKeyId, secretAccessKey, sessionToken);

        // });


        // AWSUserManagement.authenticateUser('bhuvanmishra13@gmail.com', '123456')
        //     .then((result) => {
        //         console.log("Success Auth", result);
        //     })
        //     .catch((err) => {
        //         console.log("Error Auth", err.message)
        //     });



    }

    navigateToLogin = () => {
        this.props.history.replace('/login');
    };

    inputs = (
        <div>
            <label className={`${styles.labelText}`}>Email Id</label>
            <input onChange={this.onEmailChange} className={`form-control`} />
            <label className={`${styles.labelText} mt-2`}>Password</label>
            <input onChange={this.onPasswordChange} type={`password`} className={`form-control`} />
        </div>
    );

    signUpButtonAndAlreadyAMemberText = (
        <div>
            <div className={`text-center mt-4`}>
                <button className={`btn btn-primary form-control`} onClick={this.signUp}>SignUp</button>
            </div>
            <div className={`d-flex justify-content-between align-items-center mt-4`}>
                <div className={`d-inline ${styles.lineDiv}`}></div>
                <p className={`d-inline ${styles.alreadyAMemberText} m-0 p-0`}>Already a member?</p>
                <div className={`d-inline ${styles.lineDiv}`}></div>
            </div>
        </div>
    );

    loginButton = (<button onClick={this.navigateToLogin} className={`btn btn-light form-control mt-4 ${styles.login}`}>Login</button>);

    constructor(props) {
        super(props);

        this.state = {
            content: (
                <div>
                    {this.signUpHeader}
                    {this.inputs}
                    {this.signUpButtonAndAlreadyAMemberText}
                    {this.loginButton}
                </div>
            )
        };
    }

    render() {
        return (
            <div className={`mx-3 mb-2`} >
                {this.state.content}
            </div >
        );

    }

};

export default withRouter(SignUp);