import React, { Component } from 'react';

import styles from './Item.css';
import * as appConstants from '../../../constants/AppConstants';

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rightColumn: {
                height: 0,
                display: "none"
            }
        };
    }

    imageLoaded = () => {

        let heightOfImage = document.getElementById(styles.forGettingHeightOfImage).height;

        this.setState({
            rightColumn: {
                height: heightOfImage,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        });
    }

    render() {
        return (
            <div className={`${styles.itemRoot}`}>
                <div className={`h-100 ${styles.borderedContainer}`}>
                    <div className={`container`}>
                        <div className={`row my-3`}>
                            <div className={`col-6`}>
                                <img onLoad={this.imageLoaded} id={styles.forGettingHeightOfImage} className={`w-100`} src={`${appConstants.LINK_TO_ROOT_PATH_OF_DISPLAY_ONLY_IMAGES}${this.props.imageFileName}`} />
                            </div>
                            <div className={`col-6`}>
                                <div style={this.state.rightColumn}>
                                    <i className={`fa fa-eur ${styles.euroIcon} d-inline-block p-0 m-0`} aria-hidden="true"></i>
                                    <p className={`${styles.priceText} d-inline-block p-0 my-0 mx-1`}>{this.props.price /100}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`row`}>
                            <p className={`${styles.descriptionText} ml-2`}>DESCRIPTION</p>
                            <p className={`${styles.text} ml-2`}>{this.props.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Item;