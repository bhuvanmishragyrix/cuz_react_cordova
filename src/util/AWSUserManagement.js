let AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import * as appConstants from '../constants/AppConstants';

export function authenticateUser(username, password) {
    const promiseForAuthenticate = new Promise((resolve, reject) => {

        var authenticationData = {
            Username: username,
            Password: password,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId: appConstants.USER_POOL_ID,
            ClientId: appConstants.APP_CLIENT_ID
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username: username,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {

                console.log("Authentication Success", result);
                resolve(result);
            },

            onFailure: function (err) {
                console.log("Authentication Error", err);
                reject(err);
            }
        });

    });

    return promiseForAuthenticate;
}

export function signUp(email, password) {
    const promiseForSignUp = new Promise((resolve, reject) => {

        var poolData = {
            UserPoolId: appConstants.USER_POOL_ID,
            ClientId: appConstants.APP_CLIENT_ID
        };
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        userPool.signUp(email, password, [], null,
            function (err, result) {

                if (err) {
                    console.log("Error", err);
                    reject(err);
                }
                else {
                    console.log("Success", result);
                    resolve(result);
                }
            }
        );
    });

    return promiseForSignUp;

}