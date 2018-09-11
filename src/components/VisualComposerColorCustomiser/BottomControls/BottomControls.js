import React, { Component } from 'react';

import styles from './BottomControls.css';

class BottomControls extends Component {

    controlDivElementWidth = window.screen.width / 5;
    controlElementStyle = {
        width: `${this.controlDivElementWidth}px`,
        fontSize: 0.2 * this.controlDivElementWidth
    }



    constructor(props) {
        super(props);

        this.state = {
            controlDivStyle: this.props.controlDivStyle,
            doneClick: this.doneClick,
            nextClick: () => {},
            nextControlElementStyle: {
                ...this.controlElementStyle,
                color: "gray"
            },
            doneControlElementStyle: {
                ...this.controlElementStyle,
                color: "black"
            }
        };

        console.log("This.props", this.props);
    }

    redirectToPreviewPage = () => {
        this.props.changeIsNextEnable();
        console.log("Redirect");
    }

    doneClick = () => {
        this.props.doneClick();
        this.props.changeIsNextEnable();
    }

    componentWillReceiveProps(newProps) {

        console.log("NewProps", newProps);

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
                        nextClick: () => {}
                    },
                    doneControlElementStyle: {
                        ...this.controlElementStyle,
                        color: "black",
                        doneClick: this.doneClick
                    }
                });
            }
            else if (newProps.isNextEnable === true) {
                this.setState({
                    nextControlElementStyle: {
                        ...this.controlElementStyle,
                        color: "black",
                        nextClick: this.redirectToPreviewPage 
                    },
                    doneControlElementStyle: {
                        ...this.controlElementStyle,
                        color: "gray",
                        doneClick: () => { }
                    }
                });
            }
        }
    }

    render() {

        return (
            <div style={this.state.controlDivStyle} className={`${styles.rootElement}`}>
                <div style={this.controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                    <input id="color-select" onChange={this.props.colorChanged} type="color" className={`p-0 m-0`} />
                </div>
                <div style={this.controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                    Reset
                </div>
                <div style={this.controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                    Preview
                </div>
                <div style={this.state.doneControlElementStyle} onClick={this.state.doneClick} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                    Done
                </div>
                <div style={this.state.nextControlElementStyle} onClick={this.state.nextClick} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                    Next
                </div>
            </div>
        );
    }

};

export default BottomControls;