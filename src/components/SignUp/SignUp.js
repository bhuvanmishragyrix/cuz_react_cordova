import React from 'react';
import styles from './SignUp.css';
import { withRouter } from 'react-router-dom';

import * as AWSUserManagement from '../../util/AWSUserManagement';

const signUp = (props) => {

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


        AWSUserManagement.signUp('test@test.com', '123456')
            .then((result) => {
                console.log("Success SignUp", result);
            })
            .catch((err) => {
                console.log("Error SignUp", err.message);
            });






        // let AmazonCognitoIdentity = require('amazon-cognito-identity-js');

        // var poolData = {
        //     UserPoolId: 'us-east-2_146m7SvBa', // Your user pool id here
        //     ClientId: '6aba19vfkda9b9da8olmcdsq0j' // Your client id here
        // };

        // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        // var userData = {
        //     Username: 'bhuvanmishra13@gmail.com',
        //     Pool: userPool
        // };

        // var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        // cognitoUser.confirmRegistration('588787', true, function (err, result) {
        //     if (err) {
        //         console.log(err.message || JSON.stringify(err));
        //         return;
        //     }
        //     console.log('call result: ' + result);
        // });



    }

    let navigateToLogin = () => {

        signUp();
        props.history.replace('/login');
    };

    return (
        <div className={`mx-3 mb-2`} >
            <p className={`${styles.signUpHeader} text-center`}>SignUp</p>
            <label className={`${styles.labelText}`}>Email Id</label>
            <input className={`form-control`} />
            <label className={`${styles.labelText} mt-2`}>Password</label>
            <input className={`form-control`} />
            <div className={`text-center mt-4`}>
                <button className={`btn btn-primary form-control`}>SignUp</button>
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