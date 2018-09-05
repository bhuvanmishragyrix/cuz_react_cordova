import React from 'react';

import styles from './BottomControls.css';

const bottomControls = () => {

    let controlDivElementWidth = window.screen.width / 5;

    const controlElementStyle = {
        width: `${controlDivElementWidth}px`,
        fontSize: 0.2 * controlDivElementWidth
    };

    return (
        <div className={`${styles.rootElement}`}>
            <div style={controlElementStyle} className={`d-inline-flex justify-content-center align-items-center ${styles.individualControlElementsStyle}`}>
                Color
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