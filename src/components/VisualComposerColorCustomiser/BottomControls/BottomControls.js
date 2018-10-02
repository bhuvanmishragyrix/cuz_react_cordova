import React, { Component } from 'react';
import $ from 'jquery';

import styles from './BottomControls.css';

class BottomControls extends Component {

    controlDivElementWidth = window.screen.width / 5;
    controlElementStyle = {
        width: `${this.controlDivElementWidth}px`,
        fontSize: 0.13 * this.controlDivElementWidth,
        fontWeight: "bold"
    }



    constructor(props) {
        super(props);

        this.state = {
            controlDivStyle: this.props.controlDivStyle,
            doneClick: this.doneClick,
            nextClick: () => { },
            nextControlElementStyle: {
                ...this.controlElementStyle,
                color: "gray"
            },
            doneControlElementStyle: {
                ...this.controlElementStyle,
                color: "black"
            }
        };
    }

    redirectToCheckoutPage = () => {
        this.props.changeIsNextEnable();
        this.props.nextClick()
    }

    doneClick = () => {
        this.props.doneClick();
        this.props.changeIsNextEnable();
    }

    setColorOfInput = (newProps) => {
        if (newProps.colorOfInput) {
            let selectedElementColorArray = this.convertRGBColorToHex(newProps.colorOfInput.toString().split("(")[1].split(")")[0].split(","))
            selectedElementColorArray = "#" + selectedElementColorArray.join("");
            $(`#${styles.colorInput}`)[0].value = selectedElementColorArray;
        }
    }

    convertRGBColorToHex = (rGB) => {
        return rGB.map(function (x) {             //For each array element
            x = parseInt(x).toString(16);      //Convert to a base16 string
            return (x.length == 1) ? "0" + x : x;  //Add zero if we get only one character
        });
    }

    componentWillReceiveProps(newProps) {

        if (newProps.controlDivStyle !== this.props.controlDivStyle) {
            this.setState({
                controlDivStyle: this.props.controlDivStyle
            });
        }

        if (newProps.isNextEnable !== this.props.isNextEnable) {

            if (newProps.isNextEnable === false) {
                this.setState({
                    nextControlElementStyle: {
                        ...this.controlElementStyle,
                        color: "gray",
                    },
                    nextClick: () => { },
                    doneControlElementStyle: {
                        ...this.controlElementStyle,
                        color: "black",
                    },
                    doneClick: this.doneClick
                });
            }
            else if (newProps.isNextEnable === true) {
                this.setState({
                    nextControlElementStyle: {
                        ...this.controlElementStyle,
                        color: "black",

                    },
                    nextClick: this.redirectToCheckoutPage,
                    doneControlElementStyle: {
                        ...this.controlElementStyle,
                        color: "gray",
                    },
                    doneClick: () => { }
                });
            }
        }


        this.setColorOfInput(newProps);

    }

    render() {

        return (
            <div style={this.state.controlDivStyle} className={`${styles.rootElement}`}>
                <div style={this.controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                    <input id={styles.colorInput} onChange={this.props.colorChanged} type="color" className={`p-0 m-0`} />
                </div>
                <div style={this.controlElementStyle} onClick={this.props.resetClick} className={`d-inline-flex justify-content-center align-items-center flex-column ${styles.individualControlElementsStyle}`}>
                    <i className={`fa fa-undo ${styles.iconFontSize}`} aria-hidden="true"></i>
                    <p className={`p-0 m-0`}>Reset</p>
                </div>
                <div style={this.controlElementStyle} onClick={this.props.previewClick} className={`d-inline-flex justify-content-center align-items-center flex-column ${styles.individualControlElementsStyle}`}>
                    <i className={`fa fa-eye ${styles.iconFontSize}`} aria-hidden="true"></i>
                    <p className={`p-0 m-0`}>Preview</p>
                </div>
                <div style={this.state.doneControlElementStyle} onClick={this.state.doneClick} className={`d-inline-flex justify-content-center align-items-center flex-column ${styles.individualControlElementsStyle}`}>
                    <i className={`fa fa-check ${styles.iconFontSize}`} aria-hidden="true"></i>
                    <p className={`p-0 m-0`}>Done</p>
                </div>
                <div style={this.state.nextControlElementStyle} onClick={this.state.nextClick} className={`d-inline-flex justify-content-center align-items-center flex-column ${styles.individualControlElementsStyle}`}>
                    <i className={`fa fa-arrow-right ${styles.iconFontSize}`} aria-hidden="true"></i>
                    <p className={`p-0 m-0`}>Next</p>
                </div>
            </div>
        );
    }

};

export default BottomControls;