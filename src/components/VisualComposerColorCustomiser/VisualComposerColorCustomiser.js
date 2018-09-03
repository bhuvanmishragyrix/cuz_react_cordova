import React, { Component } from 'react';
import * as appContants from '../../constants/AppConstants'

class VisualComposerColorCustomiser extends Component {

    constructor(props) {
        super(props);

        let remainingHeight = window.screen.height - appContants.HEIGHT_TO_SUBTRACT_FROM_WINDOW_SCREEN_HEIGHT

        this.state = {
            wrapperDivStyle: {
                height: `${remainingHeight}px`
            },
            controlsDivStyle: {
                height: `${(15 / 100) * (remainingHeight)}px`
            },
            imageDivStyle: {
                height: `${(85 / 100) * (remainingHeight)}px`
            }
        };
    }

    render() {
        return (
            <div className={`bg-danger`} style={this.state.wrapperDivStyle}>
                <div className={`bg-success`} style={this.state.imageDivStyle}></div>
                <div className={`bg-primary`} style={this.state.controlsDivStyle}>
                </div>
            </div>
        );
    }
};

export default VisualComposerColorCustomiser;