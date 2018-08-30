import React, { Component } from 'react';

import styles from './Instructions.css';

class Instructions extends Component {

    instructionsTextWithShowMore  = `Please select a graphic style (by tapping on it) from the list of styles presented below. Then on the following screen`;
    instructionsTextWithoutShowMore = `Please select a graphic style (by tapping on it) from the list of styles presented below. Then on the following screen, to customize the graphic tap any section that you would like to customize. Then select the color that you would like the section to have. You can also preview how the customization would look like on a bike by tapping the "Preview" button. You can perform these actions as many times as you like. Once you're satisfied with your customization press "Done" to remove the helper border. Then press "Next".`;

    constructor(props) {
        super(props);

        this.state = {
            textToShow: this.instructionsTextWithShowMore,
            isShowMoreShown: true,
            isShowLessShown: false
        };
    }

    hideShowMoreAndAdjustTextInParagraph = () => {

        this.setState({
            isShowMoreShown: !this.state.isShowMoreShown,
            textToShow: this.instructionsTextWithoutShowMore,
            isShowLessShown: !this.state.isShowLessShown
        });
    }

    hideShowLessAndAdjustTextInParagraph = () => {
        this.setState({
            isShowMoreShown: !this.state.isShowMoreShown,
            textToShow: this.instructionsTextWithShowMore,
            isShowLessShown: !this.state.isShowLessShown
        });
    }

    render() {
        return (
            <div className={`mx-3 mt-3`}>
                <span className={styles.text}>{this.state.textToShow}</span>
                {this.state.isShowMoreShown? <span className={`${styles.showMoreText} text-primary`} onClick={this.hideShowMoreAndAdjustTextInParagraph}>...Show More</span>: ""}
                {this.state.isShowLessShown? <p className={`${styles.showMoreText} text-primary`} onClick={this.hideShowLessAndAdjustTextInParagraph}>Show Less</p>: ""}
            </div>
        );
    }
};

export default Instructions;