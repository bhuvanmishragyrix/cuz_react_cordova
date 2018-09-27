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

export function getSVGImageFromS3(jWTToken, fileName) {

    const promiseForImageGet = new Promise((resolve, reject) => {

        setAWSCredentials(jWTToken);

        var s3 = new AWS.S3();

        var params = {
            Bucket: appConstants.BUCKET_NAME,
            Key: fileName
        };
        s3.getObject(params, function (err, data) {
            if (err) {
                reject(err);
                console.log(err, err.stack); // an error occurred
            }
            else {
                resolve(data.Body)
                console.log(data);           // successful response
            }
        });

    });

    return promiseForImageGet;

}

export function getJSONFromS3(jWTToken, fileName) {

    const promiseForJSONGet = new Promise((resolve, reject) => {

        setAWSCredentials(jWTToken);

        var s3 = new AWS.S3();

        var params = {
            Bucket: appConstants.BUCKET_NAME,
            Key: fileName
        };
        s3.getObject(params, function (err, data) {
            if (err) {
                reject(err);
                console.log(err, err.stack); // an error occurred
            }
            else {
                resolve(data.Body)
                console.log(data);           // successful response
            }
        });

    });

    return promiseForJSONGet;

}