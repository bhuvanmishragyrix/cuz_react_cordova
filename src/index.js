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
 * This (src/index.js) is the entry point of the application.
 * Here we first lock the orientation of the device to portrait. 
 * Then wait for 100ms (had to do this else the orientation wasn't getting locked to portrait).
 * Then we render the application (App.js) at the div with id "root" (present inside index.html).
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