// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify(event)
//     };
//     return response;
// };






// exports.handler = async function(event, context, callback) {   

//     const promiseForS3 = new Promise((resolve, reject) => {

//     var AWS = require("aws-sdk");
//         var s3 = new AWS.S3();

//         var params = {
//             Bucket: 'cuz-cordova',
//             Key: 'CuzProductsAndImagesData.json'
//         };
//         s3.getObject(params, function (err, data) {
//             if (err) {
//                 reject(err);

//             }
//             else {
//                 resolve(data.Body);
//             }
//         });

//     });

//     try {
//     let response = await promiseForS3;
//     callback(null, response);
//   } catch(err) {
//     callback(err); // TypeError: failed to fetch
//   }


//     // callback(JSON.stringify(event));
// }







// exports.handler = async function (event, context, callback) {

//     try {

//         var stripe = require("stripe")("sk_test_gM4OB2qD2i9uW4ez3nCKc4kx");

//         // Token is created using Checkout or Elements!
//         // Get the payment token ID submitted by the form:
//         console.log(event);
//         const token = event.token.id;

//         try {
//             const charge = await new Promise((resolve, reject) => {
//                 stripe.charges.create({
//                     amount: 100,
//                     currency: 'usd',
//                     description: 'Example charge',
//                     source: token,
//                 }, function (err, charge) {
//                     if (err) {
//                         console.log("Error",err);
//                         reject(err);
//                     }
//                     else {
//                         console.log("Success", charge);
//                         resolve(charge);
//                     }
//                 });
//             });
//             callback(null, JSON.stringify(charge));
//         }
//         catch (err) {
//             callback(JSON.stringify(err));
//         }

//     }

//     catch (err) {
//         console.log("Got Here!", err)
//         callback(JSON.stringify(err)); // TypeError: failed to fetch
//     }
// };


// exports.handler = async function (event, context, callback) {

// const promiseForDynamoDB = new Promise((resolve, reject) => {

//      var AWS = require("aws-sdk");
// var dynamodb = new AWS.DynamoDB();
//     var params = {
//   Item: {
//   "CustomerEmail": {
//       S: "test@test.com"
//   }, 
//   "Filename-TimeStampOfSave": {
//       S: "test.svg"
//   }, 
//   "Status": {
//       S: "Payment Complete"
//   }
//   }, 
//   TableName: "CUZ-OrderDetails"
//  };
//  dynamodb.putItem(params, function(err, data) {
//   if (err) {
//       reject(err);
//   } // an error occurred
//   else {
//       resolve(data)
//   }       // successful response
//  });
    
// });

// try{
//     const result = await promiseForDynamoDB;
//     callback(null, JSON.stringify(result));
// }
// catch(err) {
//     callback(JSON.stringify(err));
// }


// }


exports.handler = async function (event, context, callback) {
    
    let secretAPIKey = "sk_test_gM4OB2qD2i9uW4ez3nCKc4kx";

        var stripe = require("stripe")(secretAPIKey);

        // Token is created using Checkout or Elements!
        // Get the payment token ID submitted by the form:
        console.log(event);
        
    let token = event.token.id;
        let name = event.name;
        let city = event.city;
        let country = event.country;
        let phone = event.phone;
        let email = event.email;
        let filename = event.printFilename;
        let productDelivered = event.productDelivered;
        let priceToChargeInEuroCents = event.priceToChargeInEuroCents;

        try {
            const charge = await new Promise((resolve, reject) => {
                stripe.charges.create({
                    amount: priceToChargeInEuroCents,
                    currency: 'EUR',
                    description: 'Example charge',
                    source: token,
                    receipt_email: email,
                    metadata: {
                            name: name,
                            city: city,
                            country:country,
                            phone: phone,
                            email: email,
                            filename: filename,
                            productDelivered: productDelivered
                        }
                }, function (err, charge) {
                    if (err) {
                        console.log("Error",err);
                        reject(err);
                    }
                    else {
                        console.log("Success", charge);
                        resolve(charge);
                    }
                });
            });
            callback(null, JSON.stringify(charge));
        }
        catch (err) {
            callback(JSON.stringify(err));
        }
};