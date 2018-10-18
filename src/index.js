import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css?raw';
import App from './App';
import reducer from './store/reducer';

const store = createStore(reducer);

/**
 * <ul style="list-style: none;">
 * <li>This (src/index.js) is the entry point of the application.</li>
 * <br/>
 * <li> Build Workflow: </li>
 *      <ul>
 *          <li> We write code inside "src/" folder. </li>
 *          <li> We write our code in React and our build workflow (webpack) converts and bundles it.  </li>
 *          <li> After writing our code we run "npm run build", doing so our build workflow (webpack) bundles all the files to "www" folder. </li>
 *          <li> Once "npm run build" is successful, on android we run "cordova run android" to run the application on a connected device or emulator. </li>
 *          <li> In case there is an issue, try opening the platforms/android folder in android studio and running it from there.</li>
 *          <li> In case of ios, try opening the .xcodeproj file (present in platforms/ios/) in xcode and running it from there.</li>
 *      </ul>
 * <br/>
 * <li> Folder Structure (of src/) : </li>
 *      <ul>
 *          <li> "assets" - Contains assets such as font files and the logo. </li>
 *          <li> "awsLambdaPaymentFunction" - Contents of the folder are to be zipped and uploaded on AWS Lambda (lambdaFunc.zip is the zipped file that was uploaded). </li>
 *          <li> "containers" - Contains the components which are acting as just containers. They just contain other components. </li>
 *          <li> "components" - This is the folder which contains the different react components which are used in the application. </li>
 *          <li> "constants" - Contains a file AppConstants.js, where all the constants used in the application are defined. </li>
 *          <li> "store" - Contains all the files related to the store (redux), including reducer.js and actionTypes.js. </li>
 *          <li> "util" - Contains the AWS code that manages users (AWSUserManagement.js), the AWS code that manages other AWS services. Contains the JSON file (CUZProductsAndImagesData.json) which contains the data (inside "images" attribute) of each image which is present inside the application. For each image used inside the application there should be an entry in the "images" attribute of this file. Also it contains the price of respective graphics. The file is to be uploaded on S3. The "namesForReference" attribute is just for reference and contains the attributes that must be in each object of the images array. The "Util.js" file contains utility functions that are used application wide.</li>
 *          <li> "index.css" - Contains the css code that is globally to be used in the application.</li>
 *          <li> "App.js" - This is the root component of our application.</li>
 *          <li> "index.html" - This is the file where our bundled code (from webpack is finally attached.). The stripe script has to be hosted here. This script should always be loaded directly from https://js.stripe.com:  </li>
 *      </ul>
 * <br/>
 * <li> Code Description: </li>
 *      <ul>
 *          <li>Here we first lock the orientation of the device to portrait. </li>
 *          <li>Then wait for 100ms (had to do this else the orientation wasn't getting locked to portrait).</li>
 *          <li>Then we render the application (src/App.js) at the div with id "root" (which is present inside index.html).</li>
 *      <ul>
 * <li> Special Note: </li>
 *      <ul>
 *          <li> For the color customising algorithms written in this application to work, all the elments (e.g. path, rect, circle etc) inside the SVG parts images, which are upload on AWS S3, each of those elements should have an id.   </li>
 *          <li> An id is automatically created on each element when we open the images in Inkscape on Ubuntu and save it again as 'Plain SVG' </li>
 *          <li> Also this should also be the case with the preview Bike SVG images, and the final print image sent to the admin <li>
 *          <li> Moreover the way these images were created for this application and probably the way they should be created is that, we first should have the print image with us. </li>
 *          <li> We then should open this image in Inkscape and save it again as 'Plain SVG'. </li>
 *          <li> Once this is done, we should open this new saved 'Plain SVG' image and cut parts from it. (Do not save this 'Plain SVG' after cutting the parts though) </li>
 *          <li> And place these cut parts into the preview Bike SVG images at appropriate positions. </li>
 *          <li> Also the individual part images that we need should be stored by using these cut parts. </li>
 *          <li> This way the id for any element would be the same on the part image, the preview bike SVG image and the final print image. This condition is necessary for algorithms in this application to work. </li>
 *          <li> The color customising algorithms in this application should work then without any problem. </li>
            <li> HOWEVER IF THIS IS NOT THE CASE, THE COLOR CUSTOMISING ALGORITHMS IN THIS APPLICATION WOULD NOT WORK. </li>
 *      <ul>
 * </ul>
 */

var app = {
    // Application Constructor
    initialize: function () {
        console.log("Hello");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        console.log("Device Ready");
        window.CacheClear(() => {
            console.log("Cache Cleared Successful");
        }, () => {
            console.log("Cache Cleared Unsuccessful");
        });
        const reactApp = (
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        screen.orientation.lock('portrait').then(function success() {
            console.log("Successfully locked the orientation");
            setTimeout(() => {
                ReactDOM.render(reactApp, document.getElementById('root'));
            }, 100);
        }, function error(errMsg) {
            console.log("Error locking the orientation :: " + errMsg);
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {

    }
};

app.initialize();