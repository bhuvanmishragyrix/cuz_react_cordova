import React, { Component } from 'react';

import classes from './PizzaImage.css';
import PizzaImage from '../../assets/pizza.jpg';
import image from '../../assets/2.svg';
import $ from 'jquery';
import base64 from 'base-64';
var utf8 = require('utf8');

class PizzaImageClass extends Component {

    componentDidMount() {
        try {

            var bytes = base64.decode(image.toString().split('data:image/svg+xml;base64,')[1]);
            var text = utf8.decode(bytes);
            console.log(text);
        }
        catch (err) {
            console.log(err);
        }

    }


    readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    console.log(allText);;
                }
            }
        }
        rawFile.send(null);
    }

    render() {
        return (
            <div className={classes.PizzaImage}>
                <img src={PizzaImage} className={classes.PizzaImg} />
            </div>
        );
    }
}

export default PizzaImageClass;