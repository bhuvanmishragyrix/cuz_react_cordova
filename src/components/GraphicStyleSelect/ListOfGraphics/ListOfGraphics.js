import React from 'react';
import styles from './ListOfGraphics.css';

import * as appConstants from '../../../constants/AppConstants';

const listOfGraphics = (props) => {

    let content = "";

    if (props.imageNameData) {
        content = props.imageNameData.map((el) => {
            return (
                <div className={`d-flex justify-content-center mb-3`}>
                    <div className={`w-75`}>
                        <img className={`${styles.imageStyle}`} src={`${appConstants.LINK_TO_ROOT_PATH_OF_IMAGES}${el.filename}`} />
                        <p className={`${styles.text} p-0 my-0 mb-0 mt-2`}>{el.graphic}</p>
                    </div>
                </div>
            );
        });
    }

    return (
        content
    );
};

export default listOfGraphics;