import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

// Imports for bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css?raw'
import 'jquery';
import 'popper.js';
import 'bootstrap';

import StartPage from './containers/StartPage';


/**
 * <ul style="list-style: none;">
 * <li> This (src/App.js) is the root component of our application. </li>
 * <li> It is the parent most component, the root of the application component tree.</li>
 * <li> Code Description: </li>
 *      <ul>
 *          <li> We render the StartPage on this page which is imported from src/containers/StartPage.js</li>
 *      </ul>
 * </ul>
 */
class App extends Component {
    render() {
        return (
            <div id="app">
                <StartPage />
            </div>
        );
    }
}

export default App;