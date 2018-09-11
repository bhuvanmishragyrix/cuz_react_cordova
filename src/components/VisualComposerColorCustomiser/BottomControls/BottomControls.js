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
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.controlDivStyle !== this.props.controlDivStyle) {
            this.setState({
                controlDivStyle: this.props.controlDivStyle
            });
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
                    Done
                </div>
                <div style={this.controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                    Preview
                </div>
                <div style={this.controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                    Next
                </div>
            </div>
        );
    }

};

export default BottomControls;