import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

// Imports for bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css?raw'
import 'jquery';
import 'popper.js';
import 'bootstrap';

import StartPage from './containers/StartPage';



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