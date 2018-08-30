import React from 'react';

import styles from './Instructions.css';

const instructions = () => {
    return (
        <div className={`mx-3 pt-2`}>
            <p className={styles.text}>Please select a graphic style (by tapping on it) from the list of styles presented below. Then on the following screen, to customize the graphic tap any section that you would like to customize. Then select the color that you would like the section to have. You can also preview how the customization would look like on a bike by tapping the "Preview" button. You can perform these actions as many times as you like. Once you're satisfied with your customization press "Done" to remove the helper border. Then press "Next".</p>
        </div>
    );
};

export default instructions;