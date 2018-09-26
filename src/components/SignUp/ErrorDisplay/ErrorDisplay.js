import React from 'react';

import styles from './ErrorDisplay.css';

const errorDisplay = (props) => {
    return (
        <div className={`text-danger ${styles.errorText} mb-3`}>
            {props.text}
        </div>
    );
};

export default errorDisplay;