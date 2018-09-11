import React from 'react';

import styles from './BottomControls.css';

const bottomControls = (props) => {

    let controlDivElementWidth = window.screen.width / 5;
    let controlDivStyle = props.controlDivStyle;

    const controlElementStyle = {
        width: `${controlDivElementWidth}px`,
        fontSize: 0.2 * controlDivElementWidth
    };

    console.log("controlDivStyle", controlDivStyle);

    return (
        <div style={controlDivStyle} className={`${styles.rootElement}`}>
            <div style={controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                <input id="color-select" type="color" className={`p-0 m-0`}/>
            </div>
            <div style={controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                Reset
            </div>
            <div style={controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                Done
            </div>
            <div style={controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                Preview
            </div>
            <div style={controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                Next
            </div>
        </div>
    );
};

export default bottomControls;