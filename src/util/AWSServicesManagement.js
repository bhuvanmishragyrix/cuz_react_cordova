var AWS = require("aws-sdk");

import * as appConstants from '../constants/AppConstants';

AWS.config.region = appConstants.REGION;

const setAWSCredentials = (jWTToken) => {
    let loginAttributeNameToBeSetDynamically = {
    };

    loginAttributeNameToBeSetDynamically[`cognito-idp.${appConstants.REGION}.amazonaws.com/${appConstants.USER_POOL_ID}`] = jWTToken;


    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: appConstants.IDENTITY_POOL_ID,
        Logins: loginAttributeNameToBeSetDynamically
    });
};

export function storeImageInS3(jWTToken) {

    const promiseForImageStore = new Promise((resolve, reject) => {

        setAWSCredentials(jWTToken);

    });

    return promiseForImageStore;
}

export function getSVGImageFromS3(jWTToken) {

    const promiseForImageStore = new Promise((resolve, reject) => {

        setAWSCredentials(jWTToken);

    });

    return promiseForImageStore;

}