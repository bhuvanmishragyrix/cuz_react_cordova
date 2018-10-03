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

export function storeImageInS3(jWTToken, body, filename) {

    const promiseForImageStore = new Promise((resolve, reject) => {

        setAWSCredentials(jWTToken);

        var s3 = new AWS.S3();

        var params = {
            Body: body,
            Bucket: appConstants.BUCKET_NAME,
            Key: filename,
            ContentType: 'image/svg+xml'
        };
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log("Upload Image Error", err, err.stack); // an error occurred
                reject(err);
            }
            else {
                console.log(data);           // successful response
                resolve(data);
            }

        });

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

export const executeLambdaMakePaymentAndStoreOrderDetailsInDynamoDB = (jWTToken, payload) => {
    const promiseForLambda = new Promise((resolve, reject) => {
        setAWSCredentials(jWTToken);
        var lambda = new AWS.Lambda();

        var params = {
            FunctionName: appConstants.LAMBDA_FUNCTION_NAME_TO_MAKE_PAYMENT_AND_STORE_ORDER_DETAILS_IN_DYNAMO, /* required */
            InvocationType: 'RequestResponse',
            Payload: payload, /* new Buffer('...') || 'STRING_VALUE'  Strings will be Base-64 encoded on your behalf */
        };
        lambda.invoke(params, function (err, data) {
            if (err) {
                reject(err);
            } // an error occurred
            else {
                resolve(data);
            };           // successful response
        });
    });

    return promiseForLambda;
};