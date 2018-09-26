let AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import * as appConstants from '../constants/AppConstants';

export function AuthenticateUser(username, password) {
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