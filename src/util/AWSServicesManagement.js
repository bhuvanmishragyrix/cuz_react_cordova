var AWS = require("aws-sdk");

import * as appConstants from '../constants/AppConstants';

AWS.config.region = appConstants.REGION;

export function storeImageInS3(jWTToken) {

    let loginAttributeNameToBeSetDynamically = {
    };

    loginAttributeNameToBeSetDynamically[`cognito-idp.${appConstants.REGION}.amazonaws.com/${appConstants.USER_POOL_ID}`] = jWTToken;

    const promiseForImageStore = new Promise((resolve, reject) => {
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: appConstants.IDENTITY_POOL_ID,
            Logins: loginAttributeNameToBeSetDynamically
        });
    });

    return promiseForImageStore;
}