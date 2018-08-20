import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Users from './containers/Users';
import asyncComponent from './hoc/asyncComponent';
import AsyncPizza from './containers/Pizza.js';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'jquery';
import 'popper.js';
import 'bootstrap';



class App extends Component {
    render () {
        return (
            <div>
                <div>
                    <Link to="/">Users</Link> | <Link to="/pizza">Pizza</Link>
                </div>
                <div>
                    <Route path="/" exact component={Users} />
                    <Route path="/pizza" component={AsyncPizza} />
                </div>
            </div>
        );
    }
}

export default App;