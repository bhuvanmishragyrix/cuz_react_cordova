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


        AWSUserManagement.authenticateUser('bhuvanmishra13@gmail.com', '123456')
            .then((result) => {
                console.log("Success Auth", result);
            })
            .catch((err) => {
                console.log("Error Auth", err)
            });


        // var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

        // var params = {
        //     ClientId: '6aba19vfkda9b9da8olmcdsq0j', /* required */
        //     Password: '123456', /* required */
        //     Username: 'bhuvanmishra13@gmail.com', /* required */
        // };

        // cognitoidentityserviceprovider.signUp(params, function (err, data) {
        //     if (err) console.log(err, err.stack); // an error occurred
        //     else console.log(data);           // successful response
        // });




        // let AmazonCognitoIdentity = require('amazon-cognito-identity-js');

        // var poolData = {
        //     UserPoolId: 'us-east-2_146m7SvBa',
        //     ClientId: '6aba19vfkda9b9da8olmcdsq0j'
        // };
        // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


        // userPool.signUp('bhuvanmishra13@gmail.com', '123456', [], null, 
        //     function (err, result) {

        //         console.log("Success", err, result)

        //         // var accessToken = result.getAccessToken().getJwtToken();

        //         /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
        //         // var idToken = result.idToken.jwtToken;
        //     },

        //     function (err, result) {
        //         console.log("Failure", err, result);
        //     }
        // );

        // function (err, result) {
        //     if (err) {
        //         console.log("Error", err);
        //         return;
        //     }
        //     cognitoUser = result.user;
        //     console.log('user name is ' + cognitoUser.getUsername());
        // }




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










        let AmazonCognitoIdentity = require('amazon-cognito-identity-js');












        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //     IdentityPoolId: 'us-east-2:d77b718b-4c74-4938-a7ad-8c91d0dbcb41',
        // });

        // AWS.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})


        // var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

        // cognitoidentityserviceprovider.adminInitiateAuth({
        //     AuthFlow: 'ADMIN_NO_SRP_AUTH',
        //     ClientId: '6aba19vfkda9b9da8olmcdsq0j',
        //     UserPoolId: 'us-east-2_146m7SvBa',
        //     AuthParameters: {
        //         USERNAME: 'bhuvanmishra13@gmail.com',
        //         PASSWORD: '123456',
        //     },
        // }, function (err, data) {
        //     if (err) {
        //         console.log("Error", err)

        //         return
        //     }

        //     console.log("Success", data);
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