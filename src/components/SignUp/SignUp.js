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
    signUpHeader = (<p className={`${styles.signUpHeader} text-center`}>Sign Up</p>);

    /**
    * On change of the email input field, this function sets the class variable 'this.email' to the current value in the email input field.
    * @param {Object} evt The event object that the input field gives us, on change on the input field value
    */
    onEmailChange = (evt) => {
        this.email = evt.target.value;
    };

    /**
    * On change of the password input field, this function sets the class variable 'this.password' to the current value in the password input field.
    * @param {Object} evt The event object that the input field gives us, on change on the input field value
    */
    onPasswordChange = (evt) => {
        this.password = evt.target.value;
    };

    /**
    * <ul style="list-style:none;">
    * <li> This function first of all replaces the Sign Up button on the Sign Up screen by a circular loader. </li>
    * <li> Then checks if the email or password fields are empty, or if the length of the password is less than 6 characters. If any of this is true, it shows an error on the page. </li>
    * <li> Else we try to signUp the user using 'signUp' function (from 'src/util/AWSUserManagement.js') </li>
    * <li> On successful signUp, we display a success message, and present the user with a "Login" button to redirect him to LoginPage (from 'src/containers/LoginPage.js')</li> 
    * <li> If the signUp fails, we display an appropriate error message on the screen.
    * </ul>
    */
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
                    else if (err.message === "Username should be an email.") {
                        errorText = "Please enter a valid email."
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

    }

    /**
     * This function navigates to '/login' route, i.e. LoginPage (from src/containers/LoginPage.js).
    */
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
                <button className={`btn btn-primary form-control`} onClick={this.signUp}>Sign Up</button>
            </div>
            <div className={`d-flex justify-content-between align-items-center mt-4`}>
                <div className={`d-inline ${styles.lineDiv}`}></div>
                <p className={`d-inline ${styles.alreadyAMemberText} m-0 p-0`}>Already a member?</p>
                <div className={`d-inline ${styles.lineDiv}`}></div>
            </div>
        </div>
    );

    loginButton = (<button onClick={this.navigateToLogin} className={`btn btn-light form-control mt-4 ${styles.login}`}>Login</button>);

    /**
    * This is the constructor for this class, we set the content that we'll see on the screen, here in 'state'.
    * @param {Object} props These are the props the constructor receives
    */
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

    /**
    * This is the render function of this class.
    */
    render() {
        return (
            <div className={`mx-3 mb-2`} >
                {this.state.content}
            </div >
        );

    }

};

export default withRouter(SignUp);