import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

// Imports for bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'jquery';
import 'popper.js';
import 'bootstrap';

import HomePage from './containers/HomePage';



class App extends Component {
    render() {
        return (
            <div id="app">
                <HomePage />
                {/* <div>
                    <Link to="/">Users</Link> | <Link to="/pizza">Pizza</Link>
                </div>
                <div>
                    <Route path="/" exact component={Users} />
                    <Route path="/pizza" component={AsyncPizza} />
                </div> */}
            </div>
        );
    }
}

export default App;