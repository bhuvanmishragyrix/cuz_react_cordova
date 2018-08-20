import React, { Component } from 'react';

import './PizzaImage.css';
import PizzaImage from '../../assets/pizza.jpg';
import image from '../../assets/2.svg';
import base64 from 'base-64';
var utf8 = require('utf8');

class PizzaImageClass extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        try {

            $(document).ready(function () {
                var parser = new DOMParser();
                var bytes = base64.decode(image.toString().split('data:image/svg+xml;base64,')[1]);
                var text = utf8.decode(bytes);
                console.log(text);
                var doc = parser.parseFromString(text, "image/svg+xml");


                document.getElementById("test1").appendChild(doc.getElementsByTagName("svg")[0]);
                console.log($('path')[1].setAttribute('style', 'fill:#000000;'));

                document.addEventListener("backbutton", onBackKeyDown, false);

                function onBackKeyDown() {
                    navigator.app.exitApp();
                }
            });


        }
        catch (err) {
            console.log(err);
        }

    }

    render() {
        return (
            <div>
                <div id="test1" className="PizzaImage">
                    {/* <img src={PizzaImage} className={classes.PizzaImg} /> */}

                </div>
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={PizzaImage} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={PizzaImage} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={PizzaImage} alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default PizzaImageClass;