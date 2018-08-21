import React, { Component } from 'react';

import './PizzaImage.css';
import PizzaImage from '../../assets/pizza.jpg';
import image from '../../assets/2.svg';
import base64 from 'base-64';
var utf8 = require('utf8');
import axios from 'axios';
import $ from 'jquery';
import { connect} from 'react-redux';

class PizzaImageClass extends Component {

    constructor(props) {
        super(props);

    }

    getBase64(url) {
        return axios
          .get(url, {
            responseType: 'arraybuffer'
          })
          .then(response => {
            $(document).ready(function () {
                var parser = new DOMParser();
                var bytes = base64.decode(new Buffer(response.data, 'binary').toString('base64'));
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
        })
      }

    componentDidMount() {
        try {

            this.getBase64(`https://s3-ap-southeast-2.amazonaws.com/cuz-gyrix/2.svg`);


        }
        catch (err) {
            console.log(err);
        }

    }

    render() {
        return (
            <div>
                {this.props.test}
                <div id="test1" className="PizzaImage">
                    {/* <img src={PizzaImage} className={classes.PizzaImg} /> */}

                </div>
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={`https://s3-ap-southeast-2.amazonaws.com/cuz-gyrix/static/media/logo.5d5d9eef.svg`} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`https://s3-ap-southeast-2.amazonaws.com/cuz-gyrix/static/media/logo.5d5d9eef.svg`} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={`https://s3-ap-southeast-2.amazonaws.com/cuz-gyrix/static/media/logo.5d5d9eef.svg`} alt="Third slide" />
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

const mapStateToProps = (state) => {
return {
    test: state.test
}
};

export default connect(mapStateToProps)(PizzaImageClass);