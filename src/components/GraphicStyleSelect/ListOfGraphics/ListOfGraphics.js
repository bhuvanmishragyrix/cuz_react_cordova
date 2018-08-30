import React from 'react';

import * as appConstants from '../../../constants/AppConstants';

const listOfGraphics = (props) => {

    let content = "";

    if (props.imageNameData) {
        content = props.imageNameData.map((el) => {
            return (
                <img className={`w-100 mb-3`} src={`${appConstants.LINK_TO_ROOT_PATH_OF_IMAGES}${el.filename}`} />
            );
        });
    }

    return (
        content
    );
};

export default listOfGraphics;