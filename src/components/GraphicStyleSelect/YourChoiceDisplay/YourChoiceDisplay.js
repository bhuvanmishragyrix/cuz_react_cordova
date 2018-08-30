import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import styles from './YourChoiceDisplay.css';
import * as appConstants from '../../../constants/AppConstants';

class YourChoiceDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            heightOfDiv: {
                height: 0,
                display: "none"
            }
        };
    }

    componentDidMount() {
        this.setState({
            heightOfDiv: {
                height: $(`.${styles.forGettingHeightOfImage}`).height(),
                display: "flex",
                flexDirection: "column",
                alignItems:"center",
                justifyContent: "center"
            }
        });
    }

    render() {
        return (
            <div>
                <p className={`${styles.text}`}>YOUR CHOICE IS</p>
                <div className={`container`}>
                    <div className={`row`}>
                        <div className={`col-6`}>
                            <img className={`w-100 ${styles.forGettingHeightOfImage}`} src={`${appConstants.LINK_TO_ROOT_PATH_OF_IMAGES}${this.props.selectedCategoryImageFileName}`} />
                        </div>
                        <div className={`col-6`}>
                            <div style={this.state.heightOfDiv}>
                                    <p className={`${styles.selectionText} text-primary`}>{this.props.selectedBrand}</p>
                                    <p className={`${styles.selectionText} ${styles.modelTextStyle}`}>{this.props.selectedModel}</p>
                                    <p className={`${styles.selectionText} text-danger`}>{this.props.selectedYear}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        selectedCategory: state.selectedCategory,
        selectedBrand: state.selectedBrand,
        selectedYear: state.selectedYear,
        selectedModel: state.selectedModel,
        selectedCategoryImageFileName: state.selectedCategoryImageFileName
    };
};

export default connect(mapStateToProps)(YourChoiceDisplay);