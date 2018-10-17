import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrandYearModelSelection from '../components/BrandYearModelSelection/BrandYearModelSelection';

/**
 * <ul style="list-style:none;">
 * <li> This is the Brand, Year, and Model selection page. </li>
 * <li> Overall on the BrandYearModel selection page, the user can view the available Brands, and </li>
 * <li> The available Years, and </li>
 * <li> The Models available for the current Brand and Year pair. </li>
 * <li> The user can also change the Brand and Year to see the available Models for that particular selection. </li>
 * <li> The user can also change the current Model from the Model slider. </li>
 * <li> Finally the user can press the "Continue" button to navigate forward with the current selection.  </li>
 * </ul>
 */
class BrandYearModelSelectionPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productsAndImagesData: this.props.productsAndImagesData
        };
    }

    componentWillReceiveProps(newProps) {

        this.setState({
            productsAndImagesData: newProps.productsAndImagesData
        });
    }

    render() {
        return (
            <div className={`mx-3`}>
                <BrandYearModelSelection productsAndImagesData={this.state.productsAndImagesData} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        productsAndImagesData: state.images
    };
};

export default connect(mapStateToProps)(BrandYearModelSelectionPage);