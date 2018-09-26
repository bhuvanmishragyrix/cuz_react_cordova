import React, { Component } from 'react';
import styles from './Login.css';

import { withRouter } from 'react-router-dom';

import * as AWSUserManagement from '../../util/AWSUserManagement';

import * as util from '../../util/Util';

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

        AWSUserManagement.authenticateUser(this.email, this.password)
            .then((result) => {
                this.navigateToCategorySelectPage();
                console.log("Success Auth", result);
            })
            .catch((err) => {
                this.state = {
                    content: (
                        <div>
                            {this.loginHeader}
                            {this.inputs}
                            {this.loginButtonNewToCuzSignUpButton}
                        </div>
                    )
                };
                console.log("Error Auth", err.message)
            });
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

export default withRouter(Login);