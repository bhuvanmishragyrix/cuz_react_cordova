import React from 'react';
import styles from './SignUp.css';
import { withRouter } from 'react-router-dom';

import * as AWSUserManagement from '../../util/AWSUserManagement';

const signUp = (props) => {

    let email, password;

    let onEmailChange = (evt) => {
        email = evt.target.value;
    };

    let onPasswordChange = (evt) => {
        password = evt.target.value;
    };

    let signUp = () => {


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


        AWSUserManagement.signUp(email, password)
            .then((result) => {
                console.log("Success SignUp", result);
            })
            .catch((err) => {
                console.log("Error SignUp", err.message);
            });
    }

    let navigateToLogin = () => {
        props.history.replace('/login');
    };

    return (
        <div className={`mx-3 mb-2`} >
            <p className={`${styles.signUpHeader} text-center`}>SignUp</p>
            <label className={`${styles.labelText}`}>Email Id</label>
            <input onChange={onEmailChange} className={`form-control`} />
            <label className={`${styles.labelText} mt-2`}>Password</label>
            <input onChange={onPasswordChange} type={`password`} className={`form-control`} />
            <div className={`text-center mt-4`}>
                <button className={`btn btn-primary form-control`} onClick={signUp}>SignUp</button>
            </div>
            <div className={`d-flex justify-content-between align-items-center mt-4`}>
                <div className={`d-inline ${styles.lineDiv}`}></div>
                <p className={`d-inline ${styles.alreadyAMemberText} m-0 p-0`}>Already a member?</p>
                <div className={`d-inline ${styles.lineDiv}`}></div>
            </div>
            <button onClick={navigateToLogin} className={`btn btn-light form-control mt-4 ${styles.login}`}>Login</button>
        </div >
    );
};

export default withRouter(signUp);