import React from 'react';
import styles from './PartNameCarouselComponent.css';
import { checkPropTypes } from 'prop-types';


const partNameCarouSelComponent = (props) => {

    let content = "";

    if (props.carouselData) {
        content = (
            <div className={`${styles.root}`}>

            </div>
        );
    }

    return content;
};

export default partNameCarouSelComponent;