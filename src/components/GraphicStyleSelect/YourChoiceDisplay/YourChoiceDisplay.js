import React from 'react';
import {connect} from 'react-redux';

import styles from './YourChoiceDisplay.css';

const yourChoiceDisplay = (props) => {

    console.log(props.selectedCategory, props.selectedBrand, props.selectedYear, props.selectedModel, props.selectedCategoryImageFileName);

    return (
        <div>
            <p className={`${styles.text}`}>YOUR CHOICE IS</p>
            <div>

            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedCategory: state.selectedCategory,
        selectedBrand:state.selectedBrand,
        selectedYear: state.selectedYear,
        selectedModel: state.selectedModel,
        selectedCategoryImageFileName: state.selectedCategoryImageFileName
    };
};

export default connect(mapStateToProps)(yourChoiceDisplay);