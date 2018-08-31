import React from 'react';

import * as appConstants from '../../../constants/AppConstants';

const listOfGraphics = (props) => {

    let content = "";

    if (props.imageNameData) {
        content = props.imageNameData.map((el) => {
            return (
                <div className={`text-center`}>
                    <img className={`w-75 mb-3`} src={`${appConstants.LINK_TO_ROOT_PATH_OF_IMAGES}${el.filename}`} />
                </div>
            );
        });
    }

    return (
        content
    );
};

export default listOfGraphics;